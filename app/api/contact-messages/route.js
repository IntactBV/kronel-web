import crypto from "node:crypto";
import nodemailer from "nodemailer";

const CAPTCHA_MAX_AGE_MS = 10 * 60 * 1000;
const CAPTCHA_MIN_AGE_MS = 2500;
const CAPTCHA_SECRET = process.env.CONTACT_CAPTCHA_SECRET || "kronel-studio-contact-captcha";
const DEFAULT_CONTACT_EMAIL = "gabi.balasz@gmail.com";
const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  message: 5000,
  language: 12,
  page: 80,
};

function cleanText(value) {
  return typeof value === "string"
    ? value.replaceAll("\0", "").replace(/\r\n?/g, "\n").trim()
    : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) && !/[\r\n]/u.test(value);
}

function findUrls(value) {
  return value.match(/\b(?:https?:\/\/|www\.)[^\s<>"']+/giu) ?? [];
}

function analyzeContent(fields) {
  const content = [fields.name, fields.company, fields.message].join("\n");
  const normalized = content.toLowerCase().replace(/\s+/g, " ");
  const urls = findUrls(content);
  let riskScore = 0;

  const executableOrCredentialUrl =
    /\b(?:javascript|data|file|vbscript):/iu.test(content) ||
    /\.(?:exe|scr|bat|cmd|com|msi|ps1|jar|apk)(?:[?#\s]|$)/iu.test(content);
  const activeMarkup =
    /<\s*(?:script|iframe|object|embed|form|input|meta|link)\b/iu.test(content) ||
    /\bon(?:error|load|click|mouseover)\s*=/iu.test(content);
  const credentialRequest =
    /\b(?:password|passcode|login credentials?|seed phrase|recovery phrase|private key|one[- ]time (?:password|code)|otp)\b/iu.test(
      normalized,
    );
  const coerciveAction =
    /\b(?:verify|confirm|validate|unlock|restore|reactivate|sign[ -]?in|log[ -]?in|click|open|download)\b/iu.test(
      normalized,
    );
  const impersonationOrUrgency =
    /\b(?:account (?:is |has been )?(?:locked|suspended|compromised)|unauthori[sz]ed activity|immediate action|required urgently|final warning|security alert)\b/iu.test(
      normalized,
    );
  const financialFraud =
    /\b(?:wire transfer|bank details|gift cards?|cryptocurrency wallet|bitcoin wallet|payment overdue|invoice attached)\b/iu.test(
      normalized,
    );
  const obfuscatedUrl =
    /\b(?:hxxps?|https?)\s*(?:\[\s*dot\s*\]|\(\s*dot\s*\)|\s+dot\s+)\s*/iu.test(content) ||
    /\b[a-z0-9-]+\s*(?:\[\s*dot\s*\]|\(\s*dot\s*\))\s*[a-z]{2,}\b/iu.test(content);

  if (executableOrCredentialUrl || activeMarkup) riskScore += 10;
  if (credentialRequest && coerciveAction) riskScore += 6;
  if (impersonationOrUrgency && (coerciveAction || urls.length > 0)) riskScore += 5;
  if (financialFraud && (coerciveAction || urls.length > 0)) riskScore += 4;
  if (obfuscatedUrl) riskScore += 5;
  if (urls.length >= 4) riskScore += 4;
  if (urls.length >= 8) riskScore += 10;

  return {
    safe: riskScore < 5,
    riskScore,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureMailConfig() {
  const config = {
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT ?? "", 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL_TO ?? DEFAULT_CONTACT_EMAIL,
    secure: process.env.SMTP_SECURE || undefined,
  };

  if (!config.host || !config.port || !config.user || !config.pass || !config.from || !config.to) {
    throw new Error("Email delivery is not configured.");
  }

  if (config.port < 1 || config.port > 65535 || !isValidEmail(config.to)) {
    throw new Error("Email delivery configuration is invalid.");
  }

  if (config.secure !== undefined && !["true", "false"].includes(config.secure.toLowerCase())) {
    throw new Error("SMTP_SECURE must be either true or false.");
  }

  config.secure =
    config.secure === undefined
      ? config.port === 465
      : config.secure.toLowerCase() === "true";

  return config;
}

function buildEmailHtml(entry) {
  const createdAt = new Date(entry.createdAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Bucharest",
  });
  const safeMessage = escapeHtml(entry.message).replaceAll("\n", "<br />");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Kronel Studio Inquiry</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f0fb;font-family:Inter,Arial,sans-serif;color:#16121f;">
        <div style="padding:32px 16px;background:linear-gradient(180deg,#f3f0fb 0%,#ebe6f8 100%);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;margin:0 auto;border-collapse:separate;">
            <tr>
              <td style="padding:0 0 16px;">
                <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:#efe8ff;color:#5f24e6;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">
                  Kronel Studio
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid #e7dcff;border-radius:28px;padding:32px;box-shadow:0 24px 80px rgba(95,36,230,0.08);">
                <h1 style="margin:0 0 10px;font-size:30px;line-height:1.1;color:#16121f;">New project brief received</h1>
                <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#5f5672;">
                  A new inquiry was submitted through the studio landing page contact form.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0 12px;">
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Name</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">${escapeHtml(entry.name)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Email</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">
                      <a href="mailto:${escapeHtml(entry.email)}" style="color:#5f24e6;text-decoration:none;">${escapeHtml(entry.email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Company</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">${escapeHtml(entry.company || "Not provided")}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Submitted</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">${escapeHtml(createdAt)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Language</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">${escapeHtml(entry.language)}</td>
                  </tr>
                  <tr>
                    <td style="width:160px;padding:14px 16px;border-radius:18px;background:#f7f4ff;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Page</td>
                    <td style="padding:14px 16px;border-radius:18px;background:#fbfaff;color:#16121f;font-size:15px;">${escapeHtml(entry.page)}</td>
                  </tr>
                </table>

                <div style="margin-top:22px;padding:22px 24px;border-radius:24px;background:linear-gradient(180deg,#f7f4ff 0%,#fdfcff 100%);border:1px solid #ece2ff;">
                  <div style="margin:0 0 10px;color:#6c6390;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Project brief</div>
                  <div style="font-size:15px;line-height:1.8;color:#16121f;">${safeMessage}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
}

function buildEmailText(entry) {
  return [
    "New project brief received",
    "",
    `Name: ${entry.name}`,
    `Email: ${entry.email}`,
    `Company: ${entry.company || "Not provided"}`,
    `Language: ${entry.language}`,
    `Page: ${entry.page}`,
    `Submitted: ${entry.createdAt}`,
    "",
    "Message:",
    entry.message,
  ].join("\n");
}

async function sendContactEmail(entry) {
  const config = ensureMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: entry.email,
    subject: `New Kronel Studio inquiry from ${entry.name}`,
    text: buildEmailText(entry),
    html: buildEmailHtml(entry),
  });
}

function encodeCaptchaToken(payload) {
  const serialized = JSON.stringify(payload);
  const base = Buffer.from(serialized, "utf8").toString("base64url");
  const signature = crypto.createHmac("sha256", CAPTCHA_SECRET).update(base).digest("base64url");
  return `${base}.${signature}`;
}

function decodeCaptchaToken(token) {
  if (typeof token !== "string") return null;

  const [base, signature] = token.split(".");
  if (!base || !signature) return null;

  const expectedSignature = crypto.createHmac("sha256", CAPTCHA_SECRET).update(base).digest("base64url");
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(base, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function createCaptchaChallenge() {
  const challengeType = crypto.randomInt(0, 3);
  let left;
  let right;
  let answer;
  let prompt;

  if (challengeType === 0) {
    left = crypto.randomInt(2, 10);
    right = crypto.randomInt(2, 10);
    answer = left + right;
    prompt = `What is ${left} + ${right}?`;
  } else if (challengeType === 1) {
    left = crypto.randomInt(6, 16);
    right = crypto.randomInt(2, left - 1);
    answer = left - right;
    prompt = `What is ${left} - ${right}?`;
  } else {
    left = crypto.randomInt(2, 10);
    right = crypto.randomInt(2, 6);
    answer = left * right;
    prompt = `What is ${left} x ${right}?`;
  }

  const issuedAt = Date.now();

  return {
    prompt,
    token: encodeCaptchaToken({
      answer,
      issuedAt,
    }),
  };
}

function validateCaptcha(token, answer) {
  const payload = decodeCaptchaToken(token);
  if (!payload) {
    return { ok: false, error: "Captcha verification failed." };
  }

  const { answer: expectedAnswer, issuedAt } = payload;
  if (![expectedAnswer, issuedAt].every((value) => Number.isFinite(value))) {
    return { ok: false, error: "Captcha verification failed." };
  }

  const ageMs = Date.now() - issuedAt;
  if (ageMs < CAPTCHA_MIN_AGE_MS) {
    return { ok: false, error: "Form submitted too quickly. Please try again." };
  }

  if (ageMs > CAPTCHA_MAX_AGE_MS) {
    return { ok: false, error: "Captcha expired. Please try again." };
  }

  const numericAnswer = Number.parseInt(String(answer).trim(), 10);
  if (!Number.isFinite(numericAnswer) || numericAnswer !== expectedAnswer) {
    return { ok: false, error: "Captcha answer is incorrect." };
  }

  return { ok: true };
}

export async function GET() {
  return Response.json(createCaptchaChallenge(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = cleanText(body?.name);
    const email = cleanText(body?.email);
    const company = cleanText(body?.company);
    const message = cleanText(body?.message);
    const language = cleanText(body?.language) || "en";
    const page = cleanText(body?.page) || "studio";
    const captchaToken = body?.captchaToken;
    const captchaAnswer = body?.captchaAnswer;
    const website = cleanText(body?.website);

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const fields = { name, email, company, message, language, page };
    const hasOversizedField = Object.entries(FIELD_LIMITS).some(
      ([field, limit]) => fields[field].length > limit,
    );
    if (hasOversizedField) {
      return Response.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (website) {
      return Response.json({ error: "Submission rejected." }, { status: 400 });
    }

    const captchaValidation = validateCaptcha(captchaToken, captchaAnswer);
    if (!captchaValidation.ok) {
      return Response.json({ error: captchaValidation.error }, { status: 400 });
    }

    const contentAnalysis = analyzeContent(fields);
    if (!contentAnalysis.safe) {
      return Response.json(
        { error: "The message could not be accepted because it may contain unsafe content." },
        { status: 400 },
      );
    }

    const entry = {
      id: crypto.randomUUID(),
      name,
      email,
      company,
      message,
      language,
      page,
      createdAt: new Date().toISOString(),
    };

    await sendContactEmail(entry);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return Response.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
