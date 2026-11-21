import { AreaMap } from "@/components/Blocks";
import Faq from "@/components/Faq";
import FleetCarousel from "@/components/FleetCarousel";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import ScheduleForm from "@/components/ScheduleForm";
import {
  BookStrip, Fleet, Hero, Marquee, PhotoBand, Services, Steps, TransportServices,
} from "@/components/Sections";
import { faqs } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <BookStrip />
      <Marquee />
      <Services />
      <Fleet />
      <FleetCarousel />
      <Steps />
      <PhotoBand />
      <ScheduleForm />
      <TransportServices />
      <Faq />
      <AreaMap />
    </>
  );
}
