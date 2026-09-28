"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pastEvents, Event } from "../archive/events";
import Link from "next/link";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { koulen } from "@/lib/fonts";
import { motion } from "framer-motion";

export function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const filteredEvents =
    selectedCategory === "all"
      ? pastEvents
      : pastEvents.filter((e) => e.category.toLowerCase() === selectedCategory);

  return (
    <main className="min-h-screen pt-[88px]">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl sm:text-4xl lg:text-5xl mb-4 ${koulen.className}`}
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            We organize workshops, competitions, training sessions, and
            networking opportunities to fuel your entrepreneurial journey.
          </motion.p>
        </div>
      </section>

      {/* All Events */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8">All Events</h2>

          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="mb-8"
          >
            <TabsList className="flex flex-row space-x-4">
              <TabsTrigger value="all" className="px-2">
                All Events
              </TabsTrigger>
              <TabsTrigger value="competition" className="px-2">
                Competitions
              </TabsTrigger>
              <TabsTrigger value="workshop" className="px-2">
                Workshops
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onCardClick={openModal} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No events found in this category.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-full py-4 mt-12">
          <p className="text-lg font-semibold mb-4 text-center">
            Want to organize an event?&nbsp;
            <Link href="/contact" className="text-purple-700 underline">
              Contact Us
            </Link>{" "}
          </p>
        </div>
      </section>
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={closeModal}
      />
    </main>
  );
}
