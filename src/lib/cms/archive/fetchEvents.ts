import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { URLSearchParams } from "url";
import { EventCategory } from "@/types/content";
import { cmsClient } from "../cmsClient";
import { transformEvents } from "../transform";

type Options = {
  category?: EventCategory;
  limit?: number;
  page?: number;
};

/**
 * Gets all events from CMS and returns them as a list Event objects
 * @returns all events
 */
export const getEvents = async (category?: string) => {
  const params = new URLSearchParams();
  if (category) params.set("where[categories][in]", category);

  const result = await cmsClient.get(`/api/events?${params.toString()}`);
  return transformEvents(result.docs);
};

/**
 *
 * @param startDate Date object representing the start of the search interval
 * @param endDate Date object representing the end of the search interval
 * @param options Options for filtering api result
 * @param sort boolean representing whether to sort by start date
 * @returns Events in date range with filtering
 */
export const getEventsInRange = async (
  startDate: Date,
  endDate: Date,
  options?: Options,
  sort?: boolean,
) => {
  const params = new URLSearchParams();

  // Options filtering
  if (options?.limit) params.set("limit", String(options.limit));
  if (options?.page) params.set("page", String(options.page));
  // if (options?.category) params.set("where[categories][in]", options.category);

  // ensure event is after the start date
  params.set(
    "where[schedule.startTime][greater_than_equal]",
    startDate.toISOString(),
  );

  // ensure event is before end date
  params.set(
    "where[schedule.startTime][less_than_equal]",
    endDate.toISOString(),
  );

  // sort by event startTime
  if (sort !== false) {
    params.set("sort", "schedule.startTime");
  }
  params.set("depth", "1");

  // fetch and return results
  const result = await cmsClient.get(`/api/events?${params.toString()}`);
  return transformEvents(result.docs);
};

/**
 * Gets all events on a given day
 * @param day Desired day
 * @param options Options to filter result
 * @returns Array of event objects on the given day
 */
export const getEventsByDay = async (day: Date, options?: Options) => {
  return await getEventsInRange(startOfDay(day), endOfDay(day), options);
};

/**
 * Gets all events on a given day
 * @param day Day within the desired week (Sunday - Saturday)
 * @param options Options to filter result
 * @returns Array of event objects occuring in the week containing the given day
 */
export const getEventsByWeek = async (day: Date, options?: Options) => {
  return await getEventsInRange(startOfWeek(day), endOfWeek(day), options);
};

/**
 * Gets all events on a given day
 * @param day Day within the desired month
 * @param options Options to filter result
 * @returns Array of event objects occuring in the month containing the given day
 */
export const getEventsByMonth = async (day: Date, options?: Options) => {
  return await getEventsInRange(startOfMonth(day), endOfMonth(day), options);
};
