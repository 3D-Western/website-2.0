import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const now = new Date().toISOString();

  // Mark ended events as past
  const ended = await payload.update({
    collection: "events",
    where: {
      and: [
        { "schedule.endTime": { less_than: now } },
        { status: { not_equals: "past" } },
        { status: { not_equals: "cancelled" } },
      ],
    },
    data: { status: "past" },
  });

  // Mark currently-running events as ongoing
  const ongoing = await payload.update({
    collection: "events",
    where: {
      and: [
        { "schedule.startTime": { less_than_equal: now } },
        { "schedule.endTime": { greater_than: now } },
        { status: { not_equals: "cancelled" } },
      ],
    },
    data: { status: "ongoing" },
  });

  return NextResponse.json({
    updated: {
      toPast: ended.docs?.length ?? 0,
      toOngoing: ongoing.docs?.length ?? 0,
    },
  });
}
