import { Payload } from "payload";
import { items } from "../../components/data/teamdata";

export const teamSeed = async (payload: Payload) => {
  for (const member of items) {
    await payload.create({
      collection: "team-members",
      data: {
        image: member.image,
        name: member.name,
        role: member.role,
        description: member.description,
        emoji: member.emoji,
        linkedin: member.linkedin,
        github: member.github,
        website: member.website,
      },
    });
  }
};
