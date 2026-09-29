// src/cms/scripts/testFetch.ts
import {
  getEvents,
  getSponsors,
  getTeamMembers,
  getProjects,
  getBlogPosts,
  getTags,
} from "../../lib/cms/fetch";

const test = async () => {
  console.log("Events:", await getEvents());
  console.log("Sponsors:", await getSponsors());
  console.log("Team Members:", await getTeamMembers());
  console.log("Projects:", await getProjects());
  console.log(
    "Blogs:",
    await getBlogPosts({
      page: 1,
      limit: 100,
    }),
  );
  console.log("Tags:", await getTags());
  console.log("FETCH SUCCESSFUL");
};

test();
