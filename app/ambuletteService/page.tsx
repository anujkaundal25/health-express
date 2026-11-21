import type { Metadata } from "next";
import { AreaMap, Neighborhoods, ServicesGrid, Split } from "@/components/Blocks";
import Faq from "@/components/Faq";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ScheduleForm from "@/components/ScheduleForm";
import { brooklynNeighborhoods, faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ambulette Service Brooklyn NY | Health Express Ambulette",
  description:
    "Ambulette service in Brooklyn, NY: non-emergency medical transportation, two men assist over stairs, senior and hospital transportation. All Brooklyn ZIP codes. Open 24/7.",
  alternates: { canonical: "/ambuletteService" },
};

export default function BrooklynPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Brooklyn, NY"
        title={<>Ambulette Service <span className="gold">Brooklyn NY</span></>}
        text="Our fleet is ready for your daily appointments. We provide a wheelchair when you need one, or send two staff members to carry you over the stairs."
        photo="ph-slide1"
        crumbs={[{ label: "Ambulette Service Brooklyn NY", href: "/ambuletteService" }]}
      />
      <Split eyebrow="NEMT Services" title={<>Non-Emergency Medical <span className="gold">Transportation</span></>} photo="ph-van1">
        <p>Book your ride in advance for any time of day. Our fleet includes wheelchair-accessible vehicles of all sizes, and we cover all of Brooklyn.</p>
        <a href={site.phoneHref} className="btn btn-gold" style={{ marginTop: 10 }}>Get a Free Quote</a>
      </Split>
      <Split eyebrow="Two Men Assist" title={<>Help With <span className="gold">Stairs</span></>} photo="ph-slide4" reverse>
        <p>Wheelchair users who need help on the stairs should call us right away. With a 650 lb weight limit, two or four trained staff members transport you safely.</p>
      </Split>
      <Split eyebrow="Seniors" title={<>Transportation for <span className="gold">Seniors</span></>} photo="ph-slide2">
        <p>Our drivers help seniors get ready, take them to their appointment and bring them home again. Help can be two-person stair assistance, curbside, or room-to-room.</p>
      </Split>
      <Split eyebrow="Hospitals" title={<>Hospital <span className="gold">Transportation</span></>} photo="ph-van7" reverse>
        <p>Regular or wheelchair-accessible rides to and from any Brooklyn hospital. We can provide a wheelchair, and drivers can wait during your appointment or come back when you call.</p>
        <p><strong className="gold">Why not a taxi?</strong> Regular taxis are often not accessible to wheelchair users, may not handle special needs, and unreliable service can make you late for appointments. We also serve airports and other Brooklyn locations.</p>
      </Split>
      <ScheduleForm />
      <Neighborhoods list={brooklynNeighborhoods} title={<>Brooklyn neighborhoods <span className="gold">we serve</span></>} />
      <ServicesGrid />
      <Faq />
      <AreaMap />
    </>
  );
}
