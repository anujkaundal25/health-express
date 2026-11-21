import type { Metadata } from "next";
import { CallBand, ServicesGrid } from "@/components/Blocks";
import PageHero from "@/components/PageHero";
import { Steps, TransportServices } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Ambulette & Medical Transportation Services NYC | Health Express Ambulette",
  description:
    "Ambulette services, private medical transportation, two men assist over stairs, Medicaid ambulette and wheelchair transportation across NYC. Open 24/7.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Ambulette Services that you can <span className="gold">depend on</span></>}
        text="We take pride in our medical transportation Ambulette services NYC — wheelchair-accessible, Medicaid accepted, and open 24/7."
        photo="ph-slide1"
        crumbs={[{ label: "Services", href: "/services" }]}
      />
      <ServicesGrid title={<>Choose the ride <span className="gold">you need</span></>} />
      <TransportServices />
      <Steps />
      <CallBand />
    </>
  );
}
