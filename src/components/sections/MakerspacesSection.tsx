"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { spaces } from "@/components/data/spaces";
import { Button } from "../ui/button";
import { DASHBOARD_TRAINING_URL } from "@/components/data/links";

export function MakerspacesSection() {
  return (
    <section className=" py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2>The Makerspaces</h2>
          <p className="mt-3 text-[15px] text-secondary-text sm:text-base">
            Two floors, two disciplines, one Morrissette Building.
          </p>
        </motion.div>

        <div className="space-y-8 lg:space-y-10">
          {spaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="clip-corners overflow-hidden rounded-none border-0 bg-[#171C24] p-0">
                <div
                  className={`grid lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                    <div
                    className={`relative aspect-video w-full lg:aspect-auto lg:h-full ${
                        index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                    >
                    <Image
                      src={space.image}
                      alt={space.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <h3>{space.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-secondary-text sm:text-base">
                      {space.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
                      {space.tools.map((tool) => (
                        <div
                          key={tool}
                          className="flex items-start gap-2 text-[15px] text-secondary-text sm:text-base"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary-text" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-light">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {space.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-light">
                        <Clock className="h-4 w-4 shrink-0" />
                        {space.hours}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-5 text-center lg:mt-16"
        >
          <p className="text-[15px] text-secondary-text sm:text-base">
            Create a 3D Western account and complete Level 1 training to
            access the Makerspaces.
          </p>
          <Button variant="gradient" size="pill" asChild>
            <Link
            href={DASHBOARD_TRAINING_URL} target="_blank"
                rel="noopener noreferrer">
            Access Training
          </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}