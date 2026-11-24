import type { Metadata } from "next";
import { AreaMap, Neighborhoods, ServicesGrid, Split } from "@/components/shared/blocks";
import PageHero from "@/components/shared/page-hero";
import { brooklynNeighborhoods } from "@/components/data/site";

export const metadata: Metadata = {
  title: "South Brooklyn Ambulette | Non-Emergency Transportation | Health Express Ambulette",
  description:
    "Best non-emergency ambulette transportation for South Brooklyn: private rides, two men assist over stairs, Medicaid medical transportation. Wheelchair lift vans. Open 24/7.",
  alternates: { canonical: "/southBrooklyn" },
};

export default function SouthBrooklynPage() {
  return (
    <>
      <PageHero
        eyebrow="South Brooklyn"
        title={<>South Brooklyn <span className="gold">Ambulette</span></>}
        text="Best non-emergency ambulette transportation for South Brooklyn."
        photo="ph-van3"
        crumbs={[{ label: "South Brooklyn", href: "/southBrooklyn" }]}
      />
      <Split eyebrow="Private Transportation" title={<>Private Transportation Service <span className="gold">Brooklyn</span></>} photo="ph-van2">
        <p>On-time, comfortable rides to doctor visits, airports and other destinations for older adults and people with mobility needs.</p>
        <p>Our vans have Braun hydraulic and RICON wheelchair lifts, extended roofs and heating/AC. Our chauffeurs are trained in CPR and defensive driving.</p>
      </Split>
      <Split eyebrow="Two Men Assist" title={<>Two Men Assist Ambulette <span className="gold">Transportation</span></>} photo="ph-slide4" reverse>
        <p>Two to four trained staff help you up or down the stairs where there is no wheelchair access — for example in second- or third-floor apartments without an elevator.</p>
      </Split>
      <Split eyebrow="Private & Medicaid" title={<>Private & Medicaid Medical <span className="gold">Transportation</span></>} photo="ph-amb">
        <p><strong className="gold">Private medical transportation</strong> is an affordable luxury service for non-emergency medical travel. We accept credit card payment for riders without Medicaid.</p>
        <p><strong className="gold">Medicaid medical transportation:</strong> non-emergency rides to appointments may be covered by Medicaid for qualified riders.</p>
      </Split>
      <Neighborhoods list={brooklynNeighborhoods} title={<>We cover <span className="gold">all of Brooklyn</span></>} />
      <ServicesGrid />
      <AreaMap />
    </>
  );
}
