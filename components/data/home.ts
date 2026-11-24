import type { IconName } from "@/components/data/site";

export const workPartners: {
  name: string;
  icon: IconName;
  description: string;
}[] = [
  {
    name: "MAS",
    icon: "hospital",
    description:
      "Reliable medical transportation services that help patients reach their healthcare appointments safely and on time.",
  },
  {
    name: "Ride Health",
    icon: "heart",
    description:
      "Coordinated transportation solutions that connect patients with accessible and dependable healthcare rides.",
  },
  {
    name: "Sentry",
    icon: "shield",
    description:
      "Trusted transportation support focused on passenger safety, reliability, and quality service.",
  },
  {
    name: "MTM",
    icon: "van",
    description:
      "Non-emergency medical transportation solutions that make accessing essential healthcare easier.",
  },
];

export const facilityServices: {
  title: string;
  icon: IconName;
  description: string;
}[] = [
  {
    title: "Dialysis Centers",
    icon: "dialysis",
    description:
      "Reliable transportation for patients traveling to and from regular dialysis treatments.",
  },
  {
    title: "Chemotherapy Centers",
    icon: "stethoscope",
    description:
      "Comfortable and dependable rides for patients attending chemotherapy and cancer care appointments.",
  },
  {
    title: "Nursing Homes",
    icon: "hospital",
    description:
      "Safe transportation services for nursing home residents attending medical appointments and other essential visits.",
  },
  {
    title: "Adult Day Cares",
    icon: "daycare",
    description:
      "Convenient daily transportation that helps adults access day care programs and support services.",
  },
  {
    title: "Children's Day Cares",
    icon: "heart",
    description:
      "Dependable transportation solutions designed to help children travel safely to and from day care facilities.",
  },
  {
    title: "Standing Orders",
    icon: "calendar",
    description:
      "Scheduled recurring transportation for patients who require regular medical visits and ongoing treatments.",
  },
];