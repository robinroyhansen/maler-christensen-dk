import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { COMPANY } from "@/lib/constants"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(`https://${COMPANY.domain}`),
  title: {
    default: `Maler Slagelse | Schou & Christensen — ★ 4.9 Trustpilot`,
    template: `%s | Schou & Christensen`,
  },
  description: `Malerfirma i Slagelse med 4.9/5 på Trustpilot fra 200+ kunder. Indvendig og udvendig maling, sprøjtespartling, tapetsering, microcement og PU-gulve. Gratis tilbud — ring 53 50 77 00`,
  keywords: ["maler", "malerfirma", "Slagelse", "malerarbejde", "maling", "tapetsering", "sprøjtespartling"],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: `https://${COMPANY.domain}`,
    siteName: COMPANY.name,
    title: `Maler Slagelse | ${COMPANY.name}`,
    description: `Professionelt malerfirma i Slagelse med ${COMPANY.trustpilotRating}/5 på Trustpilot.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Maler Slagelse | ${COMPANY.name}`,
    description: `Professionelt malerfirma i Slagelse med ${COMPANY.trustpilotRating}/5 på Trustpilot.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `https://${COMPANY.domain}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="da" className={inter.variable}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://maler-christensen.dk" />
        <link rel="dns-prefetch" href="https://cduloscitjydjelqayhs.supabase.co" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://cduloscitjydjelqayhs.supabase.co" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `https://${COMPANY.domain}`,
              name: COMPANY.name,
              image: `https://${COMPANY.domain}/og-image.jpg`,
              telephone: `+45${COMPANY.phone.replace(/\s/g, "")}`,
              email: COMPANY.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: COMPANY.address,
                addressLocality: COMPANY.city,
                postalCode: COMPANY.zip,
                addressCountry: "DK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 55.4034,
                longitude: 11.3569,
              },
              url: `https://${COMPANY.domain}`,
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: COMPANY.trustpilotRating,
                reviewCount: COMPANY.trustpilotReviews,
              },
              sameAs: [
                "https://www.trustpilot.com/review/maler-christensen.dk",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
