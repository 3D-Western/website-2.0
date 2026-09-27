export type EquipmentItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  location: string;
};

export const equipment: EquipmentItem[] = [
  {
    id: "3d-printers",
    title: "3D Printers",
    image: "/images/equipment/3DPrinting.jpg",
    alt: "3D printer extruding a white part",
    description:
      "Over 30 3D printers available. After completing the 3D printing certification through our dashboard, you can submit jobs online. Simply upload your STL file, select your material preferences, and our team will process your request.",
    location: "Digital Makerspace, Morrissette",
  },
  {
    id: "laser-cutters",
    title: "Laser Cutters",
    image: "/images/equipment/LaserCutting.jpg",
    alt: "Laser cutter engraving a wood panel",
    description:
      "Cut and engrave wood, acrylic, and cardstock with precision. Great for enclosures, signage, and detailed prototypes. Complete Level 1 and laser cutting training to start using the machines.",
    location: "Digital Makerspace, Morrissette",
  },
  {
    id: "waterjet",
    title: "Waterjet Cutter",
    image: "/images/equipment/WaterjetCutting.jpg",
    alt: "Waterjet cutter slicing through metal",
    description:
      "Cut through metal, plastic, and composites with a high pressure jet of water and abrasive. Ideal for structural parts and materials our laser cutters cannot handle. Training required before use.",
    location: "Digital Makerspace, Morrissette",
  },
  {
    id: "woodworking",
    title: "Woodworking",
    image: "/images/equipment/woodworking.jpg",
    alt: "Woodworking tools in the Sabourin Makerspace",
    description:
      "Table saws, band saws, a CNC router, drill presses, sanders, and a full wall of hand tools. Walk in during open hours to build furniture, enclosures, or display pieces.",
    location: "Sabourin Makerspace, Morrissette",
  },
  {
    id: "cricut",
    title: "Cricut",
    image: "/images/equipment/cricut.jpg",
    alt: "Cricut machine cutting vinyl",
    description:
      "Cut, write, draw, and foil with our Cricut machines. Perfect for stickers, labels, iron on designs, and small craft projects. No training required, just stop by and ask a team member to get started.",
    location: "Digital Makerspace, Morrissette",
  },
  {
    id: "soldering",
    title: "Soldering Equipment",
    image: "/images/equipment/Soldering.jpg",
    alt: "Soldering iron working on a circuit board",
    description:
      "Full electronics workbenches with soldering stations, for assembling PCBs, repairing components, and wiring up custom electronics projects from start to finish.",
    location: "Digital Makerspace, Morrissette",
  },
];