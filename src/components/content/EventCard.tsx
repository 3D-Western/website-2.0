"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { cn } from "../ui/utils";
import { formatTime, parseEventDate, formatShortDate } from "./calendarUtils";
import { Event } from "@/types/content";

export const categoryStyles: Record<string, { dot: string; badge: string }> = {
  workshop: { dot: "bg-purple-600", badge: "bg-purple-50 text-purple-700" },
  social: { dot: "bg-pink-500", badge: "bg-pink-50 text-pink-700" },
  meeting: { dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
  holiday: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
  other: { dot: "bg-slate-400", badge: "bg-slate-100 text-slate-600" },
};

const statusStyles: Record<
  Event["status"],
  { label: string; badge: string } | null
> = {
  upcoming: null,
  ongoing: { label: "Happening now", badge: "bg-emerald-600 text-white" },
  past: { label: "Past", badge: "bg-slate-500 text-white" },
  cancelled: { label: "Cancelled", badge: "bg-red-600 text-white" },
};

type EventCardProps = {
  event: Event;
  onClick: (event: Event) => void;
  variant?: "default" | "compact";
  className?: string;
};

export function EventCard({
  event,
  onClick,
  variant = "default",
  className,
}: EventCardProps) {
  const date = parseEventDate(event.schedule.date);
  const status = statusStyles[event.status];

  if (variant === "compact") {
    const { day, month } = formatShortDate(date);
    return (
      <button
        onClick={() => onClick(event)}
        aria-label={`View details for ${event.title}`}
        className={cn(
          "w-full flex items-center gap-4 p-3 rounded-lg bg-white border border-slate-100 hover:border-purple-200 hover:shadow-sm transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
          event.status === "cancelled" && "opacity-60",
          className,
        )}
      >
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-purple-50 text-purple-700 shrink-0">
          <span className="text-[10px] font-semibold leading-none">
            {month}
          </span>
          <span className="text-lg font-bold leading-tight">{day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {event.title}
            </p>
            {status && (
              <span
                className={cn(
                  "shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                  status.badge,
                )}
              >
                {status.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {formatTime(event.schedule.startTime)}
            </span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
              {event.location}
            </span>
          </div>
        </div>
        <span className="flex gap-1 shrink-0" aria-hidden="true">
          {event.categories.slice(0, 3).map((cat) => (
            <span
              key={cat.name}
              className={cn(
                "w-2 h-2 rounded-full",
                categoryStyles[cat.name]?.dot ?? "bg-slate-300",
              )}
            />
          ))}
        </span>
      </button>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-lg shadow-sm group hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[300px] border-none",
        event.status === "cancelled" && "opacity-70",
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={() => onClick(event)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(event);
        }
      }}
      aria-label={`View details for ${event.title}`}
    >
      <Image
        src={event.image.src}
        alt={event.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5">
        {event.categories.map((cat) => (
          <span
            key={cat.name}
            className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-white/90 text-purple-700"
          >
            {cat.name}
          </span>
        ))}
      </div>
      {status && (
        <span
          className={cn(
            "absolute top-4 right-4 z-20 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full",
            status.badge,
          )}
        >
          {status.label}
        </span>
      )}

      <div className="relative p-6 flex flex-col justify-end h-full text-white z-20">
        <h3 className="text-2xl font-bold drop-shadow-lg leading-tight">
          {event.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm drop-shadow-md">
          <span>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {formatTime(event.schedule.startTime)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function EventCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="w-full flex items-center gap-4 p-3 rounded-lg bg-white border border-slate-100 animate-pulse">
        <div className="w-12 h-12 rounded-lg bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-slate-200 rounded" />
          <div className="h-3 w-1/3 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-lg bg-slate-200 min-h-[300px] animate-pulse" />
  );
}
