import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Footer, FloatingActions } from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Loader from "@/components/ui/loader";
import { PageEffects } from "@/components/shared/effects";
import { site } from "@/components/data/site";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-oswald", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s" },
  description: site.description,
  keywords: [
    "ambulette service NYC", "ambulette Brooklyn", "medical transportation NYC", "Medicaid ambulette",
    "wheelchair transportation", "stretcher transportation", "non-emergency medical transport", "Staten Island ambulette",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: { default: site.title, template: "%s" },
    description: site.description,
    siteName: site.name,
    images: [{ url: "/images/home/fleet-hero.jpg", width: 1536, height: 864, alt: "Health Express Ambulette van" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/images/home/fleet-hero.jpg"] },
};

export const viewport: Viewport = { themeColor: "#070f1f", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": `${site.url}/#business`,
      name: site.legalName,
      url: site.url,
      logo: `${site.url}/images/logo-coin.png`,
      image: `${site.url}/images/home/fleet-hero.jpg`,
      telephone: "+19175143080",
      email: site.email,
      foundingDate: String(site.since),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      areaServed: site.areasServed.map((l) => ({ "@type": "Place", name: l })),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      sameAs: [site.social.facebook, site.social.instagram],
    }
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Loader />
        <PageEffects />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
