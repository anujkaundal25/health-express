import About from "@/components/home/about";
import BookStrip from "@/components/home/book-strip";
import FacilitiesServices from "@/components/home/facilities-services";
import Hero from "@/components/home/hero";
import Marquee from "@/components/home/marquee";
import PhotoBand from "@/components/home/photo-band";
import PrivatePayTransportation from "@/components/home/private-pay-transportation";
import Services from "@/components/home/services";
import Steps from "@/components/home/steps";
import TransportServices from "@/components/home/transport-services";
import WorkPartners from "@/components/home/work-partners";
import { AreaMap } from "@/components/shared/blocks";
import Faq from "@/components/shared/faq";
import FleetCarousel from "@/components/shared/fleet-carousel";
import JsonLd, { faqSchema } from "@/components/shared/json-ld";
import ScheduleForm from "@/components/shared/schedule-form";
import { faqs } from "@/components/data/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <BookStrip />
      <Marquee />
      <Services />
      <About />
      <WorkPartners />
      <FleetCarousel />
      <Steps />
      <PhotoBand />
      <ScheduleForm />
      <TransportServices />
      <FacilitiesServices />
      <PrivatePayTransportation />
      <Faq />
      <AreaMap />
    </>
  );
}
