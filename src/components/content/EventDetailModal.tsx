"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { categoryStyles } from "./EventCard";
import { formatDayLabel, formatTime, parseEventDate } from "./calendarUtils";
import { cn } from "../ui/utils";
import { Event } from "@/types/content";

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusCopy: Record<
  Event["status"],
  { label: string; className: string } | null
> = {
  upcoming: null,
  ongoing: {
    label: "Happening now",
    className: "bg-emerald-50 text-emerald-700",
  },
  past: {
    label: "This event has ended",
    className: "bg-slate-100 text-slate-600",
  },
  cancelled: {
    label: "This event has been cancelled",
    className: "bg-red-50 text-red-700",
  },
};

export function EventDetailModal({
  event,
  isOpen,
  onClose,
}: EventDetailModalProps) {
  if (!event) return null;
  const status = statusCopy[event.status];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-wrap gap-1.5 mb-1">
            {event.categories.map((cat) => (
              <span
                key={cat.name}
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full",
                  categoryStyles[cat.name]?.badge ??
                    "bg-slate-100 text-slate-600",
                )}
              >
                {cat.name}
              </span>
            ))}
          </div>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>

        {status && (
          <div
            className={cn(
              "text-sm font-medium px-3 py-2 rounded-lg",
              status.className,
            )}
          >
            {status.label}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} aria-hidden="true" />
            <span>{formatDayLabel(parseEventDate(event.schedule.date))}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} aria-hidden="true" />
            <span>
              {formatTime(event.schedule.startTime)} –{" "}
              {formatTime(event.schedule.endTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} aria-hidden="true" />
            <span>{event.location}</span>
          </div>
          {/* {event.rsvp.enabled && ( */}
          {/*   <div className="flex items-center gap-2 text-sm text-muted-foreground"> */}
          {/*     <Users size={16} aria-hidden="true" /> */}
          {/*     <span> */}
          {/*       {event.rsvp.rsvpCount} */}
          {/*       {event.rsvp.capacity ? ` / ${event.rsvp.capacity}` : ""} spots */}
          {/*       reserved */}
          {/*     </span> */}
          {/*   </div> */}
          {/* )} */}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          {event.url && (
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                Event Link
                <ExternalLink
                  className="w-3.5 h-3.5 ml-1.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
