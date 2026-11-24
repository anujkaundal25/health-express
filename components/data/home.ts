import type { IconName } from "@/components/data/site";

export const workPartners: { name: string; icon: IconName }[] = [
  { name: "MAS", icon: "hospital" },
  { name: "Ride Health", icon: "heart" },
  { name: "Sentry", icon: "shield" },
  { name: "MTM", icon: "van" },
];

export const facilityServices: { title: string; icon: IconName }[] = [
  { title: "Dialysis Centers", icon: "dialysis" },
  { title: "Chemotherapy Centers", icon: "stethoscope" },
  { title: "Nursing Homes", icon: "hospital" },
  { title: "Adult Day Cares", icon: "daycare" },
  { title: "Children's Day Cares", icon: "heart" },
  { title: "Standing Orders", icon: "calendar" },
];
