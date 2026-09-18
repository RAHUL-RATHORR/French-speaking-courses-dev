import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
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
        url: "/french-icon.jpeg",
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
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Site Under Maintenance
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We're currently making some improvements to our website. We'll be back shortly!
              </p>
            </div>
            <div className="mt-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-base text-gray-500">
                Thank you for your patience.
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
