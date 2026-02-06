import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novi's Portfolio",
  description: "Flutter Mobile Developer • UI/UX • Graphic Design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* background di BODY supaya nggak ada garis horizontal */}
      <body className="min-h-screen text-white bg-gradient-to-br from-[#08141e] via-[#0f2a3a] to-[#020b12]">
        {/* glow global */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/18 blur-3xl" />
          <div className="absolute top-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        {/* content */}
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
