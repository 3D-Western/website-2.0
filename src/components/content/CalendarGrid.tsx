"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoryStyles } from "./EventCard";
import {
  getMonthMatrix,
  isSameDay,
  isSameMonth,
  addMonths,
  formatMonthYear,
  WEEKDAY_LABELS,
  parseEventDate,
} from "./calendarUtils";
import { cn } from "../ui/utils";
import { Event } from "@/types/content";
import { Button } from "../ui/button";

type CalendarGridProps = {
  month: Date;
  onMonthChange: (month: Date) => void;
  events: Event[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

export function CalendarGrid({
  month,
  onMonthChange,
  events,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const today = new Date();
  const weeks = getMonthMatrix(month.getFullYear(), month.getMonth());
  const [focusedDate, setFocusedDate] = useState<Date>(selectedDate ?? today);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const shouldFocusRef = useRef(false);

  useEffect(() => {
    if (!shouldFocusRef.current) return;
    const key = focusedDate.toDateString();
    buttonRefs.current.get(key)?.focus();
    shouldFocusRef.current = false;
  }, [focusedDate]);

  const eventsByDay = new Map<string, Event[]>();
  events.forEach((event) => {
    const key = parseEventDate(event.schedule.date).toDateString();
    eventsByDay.set(key, [...(eventsByDay.get(key) ?? []), event]);
  });

  const moveFocus = (delta: number) => {
    const next = new Date(focusedDate);
    next.setDate(next.getDate() + delta);
    if (!isSameMonth(next, month)) {
      onMonthChange(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    shouldFocusRef.current = true;
    setFocusedDate(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(-7);
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(7);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSelectDate(date);
        break;
    }
  };

  const goToToday = () => {
    onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));
    shouldFocusRef.current = true;
    setFocusedDate(today);
    onSelectDate(today);
  };

  return (
    <div>
      <MonthNav
        month={month}
        onMonthChange={onMonthChange}
        onToday={goToToday}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={formatMonthYear(month)}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          role="grid"
          aria-label={formatMonthYear(month)}
          className="rounded-xl border border-b-grey overflow-hidden bg-black-bg"
        >
          <div
            role="row"
            className="grid grid-cols-7 bg-grey-bg/30 border-b border-b-grey"
          >
            {WEEKDAY_LABELS.map((d) => (
              <div
                key={d}
                role="columnheader"
                className="py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-secondary-text"
              >
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div role="row" key={wi} className="grid grid-cols-7">
              {week.map((date) => {
                const key = date.toDateString();
                const dayEvents = eventsByDay.get(key) ?? [];
                const inMonth = isSameMonth(date, month);
                const isToday = isSameDay(date, today);
                const isSelected = selectedDate
                  ? isSameDay(date, selectedDate)
                  : false;
                const isTabbable = isSameDay(date, focusedDate);

                return (
                  <button
                    key={key}
                    ref={(el) => {
                      if (el) buttonRefs.current.set(key, el);
                    }}
                    role="gridcell"
                    tabIndex={isTabbable ? 0 : -1}
                    aria-selected={isSelected}
                    aria-label={`${date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ", no events"}`}
                    onClick={() => {
                      shouldFocusRef.current = true;
                      setFocusedDate(date);
                      onSelectDate(date);
                    }}
                    onFocus={() => setFocusedDate(date)}
                    onKeyDown={(e) => handleKeyDown(e, date)}
                    className={cn(
                      "relative h-16 sm:h-20 border-b border-r border-b-grey flex flex-col items-center justify-start pt-1.5 gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-400",
                      inMonth
                        ? "bg-black-bg hover:bg-purple-dark/20 text-primary-text"
                        : "bg-grey-bg/60 text-secondary-text",
                      isSelected && "bg-purple-dark/40 hover:bg-purple-dark/50",
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs sm:text-sm w-6 h-6 flex items-center justify-center rounded-full",
                        isToday && "gradient text-primary-text font-semibold",
                        !isToday && inMonth && "text-primary-text",
                      )}
                    >
                      {date.getDate()}
                    </span>
                    <div className="flex items-center gap-0.5 flex-wrap justify-center px-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            categoryStyles[event.categories[0]?.name]?.dot ??
                              "bg-primary-text",
                          )}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] text-secondary-text leading-none">
                          +{dayEvents.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export function MonthNav({
  month,
  onMonthChange,
  onToday,
}: {
  month: Date;
  onMonthChange: (month: Date) => void;
  onToday: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className={`text-2xl`}>
        {formatMonthYear(month)}
      </h2>
      <div className="flex items-center gap-2">
        <Button
          size="pill"
          variant="gradient"
          onClick={onToday}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
        >
          Today
        </Button>
        <Button
          size="icon"
          variant="outlined"
          onClick={() => onMonthChange(addMonths(month, -1))}
          aria-label="Previous month"
          className="w-8 h-8 rounded-full "
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outlined"
          onClick={() => onMonthChange(addMonths(month, 1))}
          aria-label="Next month"
          className="w-8 h-8 rounded-full "
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
export function CalendarGridSkeleton() {
  return (
    <div className="rounded-xl border border-b-grey overflow-hidden bg-black-bg animate-pulse">
      <div className="grid grid-cols-7 bg-grey-bg border-b border-b-grey">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {Array.from({ length: 7 }).map((_, di) => (
            <div
              key={di}
              className="h-16 sm:h-20 border-b border-r border-b-grey bg-grey-bg"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
