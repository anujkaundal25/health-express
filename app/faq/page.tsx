import type { Metadata } from "next";
import { CallBand } from "@/components/Blocks";
import Faq from "@/components/Faq";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { Steps } from "@/components/Sections";
import { faqs, moreFaqs } from "@/lib/site";

const all = [...faqs, ...moreFaqs];

export const metadata: Metadata = {
  title: "Ambulette FAQ – Medicaid, Stairs, Areas | Health Express Ambulette",
  description:
    "Answers about ambulette vs ambulance, Medicaid coverage, how to book, two men stair assist, areas served and payment. Health Express Ambulette, NYC.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(all)} />
      <PageHero
        eyebrow="F.A.Q."
        title={<>Frequently Asked <span className="gold">Questions</span></>}
        text="Everything you need to know about ambulette transportation with Health Express Ambulette."
        photo="ph-slide3"
        crumbs={[{ label: "F.A.Q.", href: "/faq" }]}
      />
      <div style={{ paddingTop: 40 }} />
      <Faq items={all} title={<>Your questions, <span className="gold">answered</span></>} />
      <Steps />
      <CallBand />
    </>
  );
}
