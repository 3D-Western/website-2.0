import { Payload } from "payload";
import { sampleProjects } from "../static-data/projects";

export const projectsSeed = async (payload: Payload) => {
  for (const project of sampleProjects) {
    await payload.create({
      collection: "projects",
      data: {
        ...project,
      },
    });

    console.log(`Seeded project: ${project.title}`);
  }
};
