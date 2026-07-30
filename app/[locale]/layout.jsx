import "../globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kronel | Software, Advertising & Capital",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kronel builds custom software systems and provides advertising and capital solutions for growing businesses.",
  applicationName: SITE_NAME,
  category: "technology",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default async function RootLayout({ children, params }) {
  const { locale = "en" } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
