import { Project } from "../../../payload-types";

type SampleProject = Omit<Project, "updatedAt" | "createdAt">;

export const sampleProjects: SampleProject[] = [
  {
    id: 1,
    slug: "autonomous-greenhouse-monitor",
    title: "Autonomous Greenhouse Monitor",
    creator: "Emily Chen",
    contributors: ["Emily Chen", "Raj Malhotra"],
    description:
      "A smart greenhouse system that monitors temperature, humidity, and soil moisture using custom-designed enclosures and sensors. The team iterated through four enclosure revisions to get IP-rated seals right, then built a small dashboard so club members could check on the plants remotely between shifts in the makerspace.",
    image: {
      src: "/images/dmaker.jpg",
      alt: "Autonomous greenhouse monitor enclosure with sensors",
    },
    galleryImages: [
      {
        src: "/images/dmaker.jpg",
        alt: "Autonomous greenhouse monitor enclosure with sensors",
      },
      {
        src: "/images/workshop3.webp",
        alt: "Workshop bench during greenhouse monitor assembly",
      },
    ],
    categories: [7], // Electronics
    featured: true,
    github: "https://github.com/3dwestern/greenhouse-monitor",
  },
  {
    id: 3,
    slug: "formula-student-steering-wheel",
    title: "Formula Student Steering Wheel",
    creator: "Sophia Nguyen",
    contributors: ["Sophia Nguyen", "Derek Osei", "Priya Anand"],
    description:
      "An ergonomic steering wheel designed for a student racing team, combining 3D-printed prototypes with CNC-machined components. The final version went through six rapid-prototyped iterations before the team settled on a grip profile, paddle placement, and button layout that held up through a full race weekend.",
    image: {
      src: "/images/smaker.jpg",
      alt: "Formula Student steering wheel prototype",
    },
    categories: [3], // CNC
    featured: true,
    blogUrl: "/blog/formula-student-steering-wheel",
  },
  {
    id: 5,
    slug: "adaptive-gaming-controller",
    title: "Adaptive Gaming Controller",
    creator: "Maya Thompson",
    contributors: ["Maya Thompson", "Leo Fischer"],
    description:
      "An accessible gaming controller featuring custom 3D-printed housings and modular input mechanisms designed with input from campus disability services, so buttons, triggers, and grips can be rearranged for different hand mobility needs without any soldering.",
    image: {
      src: "/images/dmaker.jpg",
      alt: "Adaptive gaming controller with modular 3D-printed housing",
    },
    categories: [2], // 3D Printing
    github: "https://github.com/3dwestern/adaptive-controller",
    blogUrl: "/blog/adaptive-gaming-controller",
  },
];
