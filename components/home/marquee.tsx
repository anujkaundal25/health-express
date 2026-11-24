import { marquee } from "@/components/data/site";

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track gold">
        {items.map((text, index) => <span key={index}>{text}</span>)}
      </div>
    </div>
  );
}
