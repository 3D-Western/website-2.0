"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarX } from "lucide-react";
import { koulen } from "@/lib/fonts";
import {
  CalendarGrid,
  CalendarGridSkeleton,
  MonthNav,
} from "@/components/content/CalendarGrid";
import { EventCard, EventCardSkeleton } from "@/components/content/EventCard";
import { EventDetailModal } from "@/components/content/EventDetailModal";
import { EventFilterBar } from "@/components/content/EventFilterBar";
import { formatDayLabel } from "@/components/content/calendarUtils";
import { useEvents } from "@/context/EventContext";
import { Event } from "@/types/content";
import PageHeader from "../content/Header";

export function EventsPage() {
  const {
    category,
    setCategory,
    view,
    setView,
    currentDate,
    setCurrentDate,
    search,
    setSearch,
    isLoading: eventsLoading,
    allCategories,
    calendarEvents,
    getEventsForDay,
    resetFilters,
  } = useEvents();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <main className="min-h-screen pt-[88px]">
      <PageHeader
        title="Our Events"
        description="Workshops, socials, and meetings — see what's happening in the makerspace"
      ></PageHeader>

      <EventFilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={allCategories}
        view={view}
        onViewChange={setView}
        resultCount={calendarEvents.length}
      />

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop / tablet: calendar-first layout */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            <div className="col-span-2">
              {eventsLoading ? (
                <CalendarGridSkeleton />
              ) : (
                <CalendarGrid
                  month={currentDate}
                  onMonthChange={setCurrentDate}
                  events={calendarEvents}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              )}
            </div>

            <div>
              <h3 className={`text-lg mb-4 ${koulen.className}`}>
                {selectedDate ? formatDayLabel(selectedDate) : "Select a day"}
              </h3>
              {eventsLoading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <EventCardSkeleton key={i} variant="compact" />
                  ))}
                </div>
              ) : selectedDayEvents.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {selectedDayEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="compact"
                      onClick={setSelectedEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-12 px-4 rounded-xl border border-dashed border-slate-200">
                  <CalendarX
                    className="w-8 h-8 text-slate-300 mb-3"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-slate-500">
                    No events on this day
                    {category !== "all" || search
                      ? " matching your filters"
                      : ""}
                    .
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: list view — renders the same calendarEvents array as the desktop grid */}
          <div className="md:hidden">
            <MonthNav
              month={currentDate}
              onMonthChange={setCurrentDate}
              onToday={() => setCurrentDate(new Date())}
            />
            {eventsLoading ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <EventCardSkeleton key={i} variant="compact" />
                ))}
              </div>
            ) : calendarEvents.length > 0 ? (
              <div className="flex flex-col gap-3">
                {calendarEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant="compact"
                    onClick={setSelectedEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-16">
                <CalendarX
                  className="w-10 h-10 text-slate-300 mb-4"
                  aria-hidden="true"
                />
                <p className="text-slate-500 mb-4">
                  No events match those filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full py-4 mt-12">
          <p className="text-lg font-semibold mb-4 text-center">
            Want to organize an event?&nbsp;
            <Link href="/contact" className="text-purple-700 underline">
              Contact Us
            </Link>
          </p>
        </div>
      </section>
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </main>
  );
}
