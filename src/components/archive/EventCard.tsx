"use client";
import { Card } from "@/components/ui/card";
import { Event } from "@/components/archive/events";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  onCardClick: (event: Event) => void;
}

export function EventCard({ event, onCardClick }: EventCardProps) {
  return (
    <Card
      key={event.id}
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer min-h-[300px]"
      onClick={() => onCardClick(event)}
    >
      <Image
        src={event.image}
        alt={event.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="relative p-6 flex flex-col justify-end h-full text-white z-20">
        <h3 className="text-2xl font-bold drop-shadow-lg">{event.title}</h3>
        <p className="text-sm drop-shadow-md">{event.date}</p>
      </div>
    </Card>
  );
}
