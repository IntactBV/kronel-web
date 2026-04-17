import "./globals.css";

export const metadata = {
  title: "Kronel Studio",
  description: "Kronel landing pages for studio, advertising, and capital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
