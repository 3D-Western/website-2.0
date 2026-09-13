import type { InstagramPost } from "../../../payload-types";

type SampleInstagramPost = Omit<InstagramPost, "createdAt" | "updatedAt">;

export const sampleInstagramPosts: SampleInstagramPost[] = [
  {
    id: 1,
    username: "yourclub",
    caption: "Late night in the shop before regionals #robotics #buildseason",
    likes: 214,
    permalink: "https://instagram.com/yourclub",
  },
  {
    id: 2,
    username: "yourclub",
    caption: "Meet the drivetrain that took us to finals 🤖",
    likes: 341,
    permalink: "https://instagram.com/yourclub",
  },
  {
    id: 3,
    username: "yourclub",
    caption: "New members, first weld. Welcome to the team!",
    likes: 189,
    permalink: "https://instagram.com/yourclub",
  },
  {
    id: 4,
    username: "yourclub",
    caption: "Throwback to our very first competition run",
    likes: 276,
    permalink: "https://instagram.com/yourclub",
  },
  {
    id: 5,
    username: "yourclub",
    caption: "CAD Sunday: reworking the intake for next season",
    likes: 158,
    permalink: "https://instagram.com/yourclub",
  },
  {
    id: 6,
    username: "yourclub",
    caption: "Sponsor shoutout, thank you for keeping the lights on",
    likes: 202,
    permalink: "https://instagram.com/yourclub",
  },
];
