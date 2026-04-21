import { readFile } from "node:fs/promises";
import path from "node:path";

const messagesFile = path.join(process.cwd(), "data", "contact-messages.json");

async function getMessages() {
  try {
    const raw = await readFile(messagesFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Studio Messages",
  description: "Saved contact form submissions for Kronel Studio.",
};

export default async function StudioMessagesPage() {
  const messages = await getMessages();

  return (
    <main className="min-h-screen px-6 py-12 sm:px-8 lg:px-12" style={{ backgroundColor: "#050505", color: "#F5F2FF" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.26em]" style={{ color: "rgba(245,242,255,0.5)" }}>
              Studio Inbox
            </div>
            <h1 className="font-display mt-4 text-[2.2rem] font-bold sm:text-[2.6rem]">Saved contact messages</h1>
          </div>
          <a
            href="/studio"
            className="inline-flex items-center rounded-xl border px-4 py-3 text-[0.9rem] font-medium"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            Back to studio
          </a>
        </div>

        <div className="mt-10 grid gap-5">
          {messages.length === 0 ? (
            <div
              className="rounded-[1.75rem] border p-6 text-[1rem]"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(245,242,255,0.68)",
              }}
            >
              No messages saved yet.
            </div>
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className="rounded-[1.75rem] border p-6"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="font-display text-[1.4rem] font-semibold">{message.name}</h2>
                    <div className="mt-2 text-[0.9rem]" style={{ color: "rgba(245,242,255,0.68)" }}>
                      {message.email}
                      {message.company ? ` • ${message.company}` : ""}
                    </div>
                  </div>
                  <div className="text-[0.82rem] uppercase tracking-[0.18em]" style={{ color: "rgba(245,242,255,0.5)" }}>
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-3 text-[0.78rem] uppercase tracking-[0.18em]" style={{ color: "rgba(245,242,255,0.5)" }}>
                  {message.page} • {message.language}
                </div>

                <p className="mt-6 whitespace-pre-wrap text-[1rem] leading-8" style={{ color: "rgba(245,242,255,0.82)" }}>
                  {message.message}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
