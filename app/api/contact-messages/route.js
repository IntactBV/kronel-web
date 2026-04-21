import { mkdir, readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
const messagesFile = path.join(dataDirectory, "contact-messages.json");
const CAPTCHA_MAX_AGE_MS = 10 * 60 * 1000;
const CAPTCHA_MIN_AGE_MS = 2500;
const CAPTCHA_SECRET = process.env.CONTACT_CAPTCHA_SECRET ?? "kronel-studio-contact-captcha";

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

async function readMessages() {
  try {
    const raw = await readFile(messagesFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function GET() {
  return Response.json(createCaptchaChallenge());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const company = body?.company?.trim() ?? "";
    const message = body?.message?.trim();
    const language = body?.language?.trim() ?? "en";
    const page = body?.page?.trim() ?? "studio";
    const captchaToken = body?.captchaToken;
    const captchaAnswer = body?.captchaAnswer;
    const website = body?.website?.trim() ?? "";

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (website) {
      return Response.json({ error: "Submission rejected." }, { status: 400 });
    }

    const captchaValidation = validateCaptcha(captchaToken, captchaAnswer);
    if (!captchaValidation.ok) {
      return Response.json({ error: captchaValidation.error }, { status: 400 });
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

    await mkdir(dataDirectory, { recursive: true });
    const existingMessages = await readMessages();
    existingMessages.unshift(entry);
    await writeFile(messagesFile, `${JSON.stringify(existingMessages, null, 2)}\n`, "utf8");

    return Response.json({ ok: true, entry });
  } catch {
    return Response.json({ error: "Unable to save message right now." }, { status: 500 });
  }
}
