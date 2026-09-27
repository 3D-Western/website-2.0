"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export function JoinUsSection() {
  return (
    // Clip only the top edge so the right oval doesn't paint over the Latest section,
    // while the left oval can still bleed down into the footer
    <section className="relative w-full bg-[#0B0D10] px-6 py-32 lg:py-44 [clip-path:inset(0_0_-2000px_0)]">
      {/* Center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[229px] w-[483px] -translate-x-1/2 -translate-y-1/2 lg:h-[457px] lg:w-[966px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(62, 24, 74, 0.42) 0%, rgba(62, 24, 74, 0.00) 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Left oval, bleeding off-screen */}
        <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
            left: "-498px",
            top: "130%",
            width: "1298.873px",
            height: "750.735px",
            transform: "translateY(-50%) rotate(-138.564deg)",
            background:
            "radial-gradient(50% 50% at 50% 50%, rgba(186, 88, 215, 0.28) 0%, rgba(186, 88, 215, 0.00) 100%)",
            filter: "blur(2px)",
        }}
        />

        {/* Right oval, bleeding off-screen */}
        <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
            left: "886px",
            top: "50%",
            width: "1298.873px",
            height: "750.735px",
            transform: "translateY(-50%) rotate(-65.643deg)",
            background:
            "radial-gradient(50% 50% at 50% 50%, rgba(186, 88, 215, 0.28) 0%, rgba(186, 88, 215, 0.00) 100%)",
            filter: "blur(2px)",
        }}
        />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <div className="eyebrow mb-5 text-sm text-purple-light">
          Ready to make something?
        </div>

        <h2 className="text-white">
          Your next project
          <br />
          starts <span className="text-purple-light">here</span>
        </h2>

        <p className="mt-6 text-[15px] leading-relaxed text-e5e1e6cc sm:text-base mb-8">
          Join hundreds of Western students already using the space.
        </p>
        <Button variant="gradient" size="pill" asChild>
             <Link href="/join"> Join Us
             </Link>
        </Button>
      </motion.div>
    </section>
  );
}