import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.frenchskill.com"),
  title: {
    default: "French Skill - Learn French Online",
    template: "%s | French Skill",
  },
  description:
    "Master French with our comprehensive online courses. Interactive lessons, expert instructors, and flexible learning for all levels.",
  applicationName: "French Skill",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/french-skill.png" },
      { url: "/french-skill.png", sizes: "16x16", type: "image/png" },
      { url: "/french-skill.png", sizes: "32x32", type: "image/png" },
      { url: "/french-skill.png", sizes: "192x192", type: "image/png" },
      { url: "/french-skill.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/french-skill.png" }],
  },
  openGraph: {
    type: "website",
    url: "https://www.frenchskill.com/",
    siteName: "French Skill",
    title: "French Skill - Learn French Online",
    description:
      "Master French with our comprehensive online courses. Interactive lessons, expert instructors, and flexible learning for all levels.",
    images: [
      {
        url: "/frenchskill-logo.png",
        width: 1200,
        height: 630,
        alt: "French Skill logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "French Skill - Learn French Online",
    description:
      "Interactive live classes by expert instructors. Join from anywhere and master French faster online.",
    images: ["/french-skill.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "-WrN_hntiCbgIW2hFXfUYmAAe_fudR-vyZcyixf5RHg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google reCAPTCHA v3 */}
        {(
          <Script
            id="recaptcha-v3"
            src={`https://www.google.com/recaptcha/api.js?render=${'6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO'}`}
            strategy="afterInteractive"
          />
        )}
        {/* Schema.org JSON-LD */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "French Skill",
            url: "https://www.frenchskill.com",
            logo: "https://www.frenchskill.com/french-skill.png",
          })}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "French Skill",
            url: "https://www.frenchskill.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.frenchskill.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KJ9XSMD4GX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KJ9XSMD4GX');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
