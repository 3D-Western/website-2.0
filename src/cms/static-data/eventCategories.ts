import type { EventCategory } from "@/types/content";
export const sampleEventCategories: EventCategory[] = [
  {
    id: 1,
    name: "workshop",
    description:
      "Hands-on sessions focused on building a specific skill or completing a guided project.",
  },
  {
    id: 2,
    name: "social",
    description:
      "Casual gatherings meant for connecting with others outside of a structured agenda.",
  },
  {
    id: 3,
    name: "meeting",
    description:
      "Organized discussions with a clear agenda, typically involving decisions or updates.",
  },
  {
    id: 4,
    name: "holiday",
    description: "Events tied to a specific holiday or seasonal celebration.",
  },
  {
    id: 5,
    name: "other",
    description: "Anything that doesn't fit neatly into the categories above.",
  },
];
