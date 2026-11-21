import type { IconName } from "@/lib/site";

const paths: Record<IconName, React.ReactNode> = {
  van: (
    <>
      <path d="M3 16V8a2 2 0 0 1 2-2h9l4 4h1a2 2 0 0 1 2 2v4" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 17h6M9 10h2M10 9v2" />
    </>
  ),
  heart: (
    <>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
      <path d="M12 10v4M10 12h4" />
    </>
  ),
  stairs: (
    <>
      <path d="M3 20h4v-4h4v-4h4V8h4V4" />
      <circle cx="8" cy="7" r="1.6" />
      <circle cx="15" cy="13" r="1.6" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M10 13v3a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  hospital: (
    <>
      <path d="M3 21V7l6-4v18M9 21h12V10l-6-3" />
      <path d="M14 13h3M15.5 11.5v3" />
    </>
  ),
  wheelchair: (
    <>
      <circle cx="10" cy="4" r="1.8" />
      <path d="M10 7v6h6l3 5" />
      <path d="M10 10h5" />
      <path d="M7.5 10.5a5.5 5.5 0 1 0 7.8 6.3" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 9V3" />
      <path d="M7 15h10" />
    </>
  ),
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
