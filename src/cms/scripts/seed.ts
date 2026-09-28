import { getPayload } from "payload";
import config from "../../../payload.config";
import { teamSeed } from "./teamSeed";
import { eventSeed } from "./eventsSeed";
import { sponsorsSeed } from "./sponsorsSeed";
import { blogsSeed } from "./blogsSeed";
import { projectsSeed } from "./projectsSeed";
import { authorsSeed } from "./authorsSeed";
import { tagsSeed } from "./tagsSeed";
import { projectCategorySeed } from "./projectCategorySeed";
import { eventCategoriesSeed } from "./eventCategoriesSeed";

const seed = async () => {
  // initialize payload
  const payload = await getPayload({ config });

  // run seed scripts

  // -- TEAM MEMBERS SEED DATA --
  await teamSeed(payload);

  // -- EVENTS SEED DATA --
  await eventCategoriesSeed(payload); // MUST RUN BEFORE EVENTS
  await eventSeed(payload);

  // -- SPONSORS SEED DATA
  await sponsorsSeed(payload);

  // -- BLOGS SEED DATA --
  await authorsSeed(payload); // MUST RUN BEFORE BLOGS
  await tagsSeed(payload); // MUST RUN BEFORE BLOGS
  await blogsSeed(payload);

  // -- PROJECTS SEED DATA --
  await projectCategorySeed(payload); // MUST RUN BEFORE PROJECTS
  await projectsSeed(payload);
  process.exit(0);
};

seed();
