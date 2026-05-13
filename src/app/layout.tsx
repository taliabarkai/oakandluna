import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppChrome } from "./AppChrome";
import "@/index.css";

export const metadata: Metadata = {
  title: "Oak and Luna | Personalized Jewelry",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
