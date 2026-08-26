import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yaa Tahay | Somali Lineage",
  description:
    "Explore Somali family connections through names, generations, and family-confirmed clan history.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const _runtimeEnv = (globalThis as any).process?.env;
  const showCodexPreview =
    _runtimeEnv?.NODE_ENV !== "production" || _runtimeEnv?.CODEX_PREVIEW === "development";

  return (
    <html lang="en">
      <head>
        {showCodexPreview ? (
          <meta name="codex-preview" content="development" />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
