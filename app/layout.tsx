import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sciparser — Your AI Agent for Real-World Tasks",
  description:
    "Type a task in plain English. A real browser opens, navigates, fills forms, clicks buttons, and delivers the result. Any website, no integration needed. Set it once, it runs daily.",
  keywords: [
    "browser automation",
    "AI agent",
    "task automation",
    "web automation",
    "Sciparser",
  ],
  authors: [{ name: "Sciparser" }],
  openGraph: {
    title: "Sciparser — Your AI Agent for Real-World Tasks",
    description:
      "Type a task in plain English. A real browser opens, navigates, fills forms, clicks buttons, and delivers the result.",
    url: "https://sciparser.com",
    siteName: "Sciparser",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sciparser — Your AI Agent for Real-World Tasks",
    description:
      "Type a task in plain English. A real browser opens, navigates, fills forms, clicks buttons, and delivers the result.",
  },
  metadataBase: new URL("https://sciparser.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
