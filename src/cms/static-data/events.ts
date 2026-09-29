import type { Event } from "@/types/content";

export const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Mystery Bucket Challenge",
    description:
      "Participants engage in the full cycle of product ideation, prototyping and learning how to pitch an innovative idea.",
    schedule: {
      date: "2026-01-14T00:00:00.000Z",
      startTime: "2026-01-14T14:00:00.000Z",
      endTime: "2026-01-14T16:00:00.000Z",
    },
    location: "Sabourin Makerspace",
    image: { src: "/images/lucky-block.webp", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f5d21d54a5775305dcb4",
    categories: ["workshop"],
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
  {
    id: 2,
    title: "Prototype and Design Thinking",
    description:
      "Fun challenge to build the tallest and most stable structure to hold a golf ball using CAD basics to design and prepare a project for printing. Any students interested in product development, prototyping and learning how to design an innovative idea are welcome, but will need to bring their own laptop.",
    schedule: {
      date: "2026-01-14T00:00:00.000Z",
      startTime: "2026-01-14T16:00:00.000Z",
      endTime: "2026-01-14T18:00:00.000Z",
    },
    location: "Digital Makerspace",
    image: { src: "/images/workshop3.webp", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f785c42f2067dc31b05e",
    categories: ["workshop"],
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
  {
    id: 3,
    title: "Spaghetti Marshmallow Challenge",
    description:
      "A fun, hands-on workshop to introduce principles of prototyping, collaboration and design thinking, using simple materials like spaghetti, marshmallows, string and tape to build the tallest structure possible.",
    schedule: {
      date: "2026-01-21T00:00:00.000Z",
      startTime: "2026-01-21T14:00:00.000Z",
      endTime: "2026-01-21T16:00:00.000Z",
    },
    location: "Sabourin Makerspace",
    image: { src: "/images/workshop2.webp", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f676bfdf6dc764c83089",
    categories: ["other"], // was "Activity" -- not a defined select option
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
  {
    id: 4,
    title: "Advanced 3D Printing Workshop: From Model to Reality",
    description:
      "Design your own desk organizer or name tag like a pen holder or phone stand! Create something functional, take it home, and make it yours. Don't miss this fun and practical hands-on competition!",
    schedule: {
      date: "2026-01-21T00:00:00.000Z",
      startTime: "2026-01-21T16:00:00.000Z",
      endTime: "2026-01-21T18:00:00.000Z",
    },
    location: "Digital Makerspace",
    image: { src: "/images/workshop1.webp", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f7f43d78d96d38414993",
    categories: ["workshop"],
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
  {
    id: 5,
    title:
      "Bob Ross Style and Brand - 'Happy Little Trees': Honoring Art and Generosity",
    description:
      "Using techniques learned during the workshop, students will use oil on canvas to create and showcase their own masterpieces in an exhibition, inspired by the Thames River in London in honor of the spirit of Bob Ross and his creative approach. This workshop is made possible through the generosity of the Sabourin Family Foundation.",
    schedule: {
      date: "2026-01-28T00:00:00.000Z",
      startTime: "2026-01-28T14:00:00.000Z",
      endTime: "2026-01-28T16:00:00.000Z",
    },
    location: "Sabourin Makerspace",
    image: { src: "/images/workshop4.webp", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f6fa7ffe1cc83a76c004",
    categories: ["workshop"],
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
  {
    id: 6,
    title: "Sewing for Entrepeneurs: Prototyping with Fabric",
    description:
      "An introductory workshop to the basics of sewing and its applications in prototyping, including foundational stitching skills for both hand and machine. Explore fabric as a medium for creating functional and aesthetic prototypes.",
    schedule: {
      date: "2026-01-28T00:00:00.000Z",
      startTime: "2026-01-28T16:00:00.000Z",
      endTime: "2026-01-28T18:00:00.000Z",
    },
    location: "Digital Makerspace",
    image: { src: "/images/sewing.jpg", alt: "Canvas Background Image" },
    url: "https://www.bouncelife.com/events/6942f84dda486964077145ca",
    categories: ["workshop"],
    recurrence: { isRecurring: false },
    rsvp: { enabled: false, rsvpCount: 0 },
    status: "upcoming",
  },
];
