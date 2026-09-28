"use client";
import useSWR from "swr";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { apiClient } from "@/lib/cms/api.client";
import {
  endOfDay,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfWeek,
} from "date-fns";
import type { Event, EventCategory } from "@/types/content";

export type View = "day" | "week" | "month" | "upcoming" | "past";
export const views: View[] = ["day", "week", "month", "upcoming", "past"];

const EventsContext = createContext<{
  // raw filter state
  view: View;
  setView: (v: View) => void;
  currentDate: Date;
  setCurrentDate: (d: Date) => void;
  category: string | undefined;
  setCategory: (c: string | undefined) => void;
  search: string;
  setSearch: (s: string) => void;
  isLoading: boolean;
  allCategories: EventCategory[];

  // fully derived — page just renders these
  calendarEvents: Event[]; // category + view/date + search applied, capped to currentDate's month; used by BOTH the calendar grid and the mobile list
  getEventsForDay: (date: Date) => Event[];
  resetFilters: () => void;
} | null>(null);

export function EventsProvider({
  initialEvents,
  initialDate,
  allCategories,
  children,
}: {
  initialEvents: Event[];
  initialDate: Date;
  allCategories: EventCategory[];
  children: React.ReactNode;
}) {
  // ---- raw state ----
  const [view, setView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");

  const monthKey = format(currentDate, "yyyy-MM");
  const isInitialMonth = monthKey === format(initialDate, "yyyy-MM");

  // compute calendar data and cache with SWR for future renders
  const { data, isLoading } = useSWR(
    ["events", monthKey],
    () => apiClient.for("events").getByMonth?.(currentDate),
    {
      fallbackData: isInitialMonth ? initialEvents : undefined,
      revalidateOnFocus: false,
    },
  );

  // Reset search filters
  const resetFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setView("month");
  }, []);

  // ---- derived selectors ----
  // category + view/date-range filtering
  const categoryAndViewFiltered = useMemo(() => {
    let result = data ?? [];
    if (category && category !== "all") {
      result = result.filter((event) =>
        event.categories.some((cat) => cat.name === category),
      );
    }
    switch (view) {
      // Events from the current date
      case "day": {
        const interval = {
          start: startOfDay(currentDate),
          end: endOfDay(currentDate),
        };
        result = result.filter((e) =>
          isWithinInterval(new Date(e.schedule.startTime), interval),
        );
        break;
      }

      // Events from the week the current date is within
      case "week": {
        const interval = {
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate),
        };
        result = result.filter((e) =>
          isWithinInterval(new Date(e.schedule.startTime), interval),
        );
        break;
      }

      // events from the month the current date is within
      case "month":
        result = result.filter((e) =>
          isSameMonth(new Date(e.schedule.startTime), currentDate),
        );
        break;

      // Events based on the "upcoming" flag on the blog collection from payload
      case "upcoming":
        result = result.filter(
          (e) => e.status === "upcoming" || e.status === "ongoing",
        );
        break;

      // events based on the "past" flag on the blog collection from payload
      case "past":
        result = result.filter((e) => e.status === "past");
        break;
    }
    return result;
  }, [data, view, currentDate, category]);

  // search narrowing for events
  const searched = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categoryAndViewFiltered;
    return categoryAndViewFiltered.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q),
    );
  }, [categoryAndViewFiltered, search]);

  // sort events by date
  const calendarEvents = useMemo(() => {
    return searched.sort(
      (a, b) =>
        new Date(a.schedule.startTime).getTime() -
        new Date(b.schedule.startTime).getTime(),
    );
  }, [searched]);

  // util for getting events for the selected date
  const getEventsForDay = useCallback(
    (date: Date) =>
      searched
        .filter((e) => isSameDay(new Date(e.schedule.startTime), date))
        .sort((a, b) =>
          a.schedule.startTime.localeCompare(b.schedule.startTime),
        ),
    [searched],
  );

  return (
    <EventsContext.Provider
      value={{
        view,
        setView,
        currentDate,
        setCurrentDate,
        category,
        setCategory,
        search,
        setSearch,
        isLoading,
        allCategories,
        calendarEvents,
        getEventsForDay,
        resetFilters,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
};
