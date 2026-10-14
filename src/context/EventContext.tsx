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
  format,
  isSameDay,

  // Legacy event filtering by time
  // endOfDay,
  // endOfWeek,
  // isSameMonth,
  // isWithinInterval,
  // startOfDay,
  // startOfWeek,
} from "date-fns";
import type { Event, EventCategory } from "@/types/content";

export type View = "day" | "week" | "month" | "upcoming" | "past";
export const views: View[] = ["day", "week", "month", "upcoming", "past"];

const EventsContext = createContext<{
  // raw filter state
  currentDate: Date;
  setCurrentDate: (d: Date) => void;
  category: string;
  setCategory: (c: string) => void;
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
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [category, setCategory] = useState<string>("All");
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
    setCategory("All");
  }, []);

  // ---- derived selectors ----
  // category + view/date-range filtering
  const categoryFiltered = useMemo(() => {
    let result = data ?? [];
    if (category && category !== "All") {
      result = result.filter((event) =>
        event.categories.some((cat) => cat.name === category),
      );
    }
    return result;
  }, [data, category]);

  // search narrowing for events
  const searched = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categoryFiltered;
    return categoryFiltered.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q),
    );
  }, [categoryFiltered, search]);

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
