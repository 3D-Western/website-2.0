export type Project = {
  id: number;
  title: string;
  creator: string;
  description: string;
  image: string;
  category:
    | "3D Printing"
    | "CNC"
    | "Laser Cutting"
    | "Water Jet"
    | "Woodworking"
    | "Electronics";
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Autonomous Greenhouse Monitor",
    creator: "Emily Chen",
    description:
      "A smart greenhouse system that monitors temperature, humidity, and soil moisture using custom-designed enclosures and sensors.",
    image: "/images/dmaker.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Custom Mechanical Keyboard",
    creator: "James Patel",
    description:
      "A fully custom keyboard featuring a laser-cut acrylic case, CNC-machined aluminum plate, and hand-soldered switches.",
    image: "/images/dmaker.jpg",
    category: "Laser Cutting",
  },
  {
    id: 3,
    title: "Formula Student Steering Wheel",
    creator: "Sophia Nguyen",
    description:
      "An ergonomic steering wheel designed for a student racing team, combining 3D-printed prototypes with CNC-machined components.",
    image: "/images/smaker.jpg",
    category: "CNC",
  },
  {
    id: 4,
    title: "Architectural Scale Model",
    creator: "Noah Wilson",
    description:
      "A detailed building model produced using laser-cut wood, acrylic panels, and precision assembly techniques.",
    image: "/images/smaker.jpg",
    category: "Laser Cutting",
  },
  {
    id: 5,
    title: "Adaptive Gaming Controller",
    creator: "Maya Thompson",
    description:
      "An accessible gaming controller featuring custom 3D-printed housings and modular input mechanisms.",
    image: "/images/dmaker.jpg",
    category: "3D Printing",
  },
  {
    id: 6,
    title: "Live-Edge Coffee Table",
    creator: "Lucas Martin",
    description:
      "A handcrafted walnut coffee table built using woodworking machinery and finished with custom metal accents.",
    image: "/images/smaker.jpg",
    category: "Woodworking",
  },
  {
    id: 7,
    title: "Competition Robot Chassis",
    creator: "Olivia Garcia",
    description:
      "A lightweight robot frame fabricated using water jet cut aluminum and precision-machined structural components.",
    image: "/images/image10.webp",
    category: "Water Jet",
  },
  {
    id: 8,
    title: "Portable Drone Dock",
    creator: "Ethan Brown",
    description:
      "A compact docking station for autonomous drones featuring CNC-cut panels and 3D-printed mounting systems.",
    image: "/images/workshop3.webp",
    category: "CNC",
  },
];