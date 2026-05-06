import "../globals.css";

export const metadata = {
  title: "Kronel Studio",
  description: "Kronel landing pages for studio, advertising, and capital.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale || "en"}>
      <body>{children}</body>
    </html>
  );
}
