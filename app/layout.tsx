import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const viewport: Viewport = {
  // matches --color-paper so mobile browser chrome blends into the dark ground
  themeColor: "#211e1b",
};

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s — ${site.fullName}`,
  },
  description:
    "Estúdio de arquitetura focado em projetos residenciais de alto padrão e corporativos.",
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.fullName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <SmoothScroll>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
