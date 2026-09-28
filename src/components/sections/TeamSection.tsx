"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { koulen } from "@/lib/fonts";
import { items, MenuItem } from "@/components/data/teamdata";
import { TeamMemberCard } from "@/components/content/TeamMemberCard";

const leadership = items.filter(
  (m) => m.role === "President" || m.role.startsWith("Chief"),
);
const vicePresidents = items.filter(
  (m) => !m.role.startsWith("Chief") && m.role !== "President",
);

// Tailwind's default breakpoints. We need the current one in JS (not just
// CSS) because it drives perPage/pagination, not just layout.
type Breakpoint = "base" | "sm" | "md" | "lg";

// Watches window width and reports which breakpoint we're in, so the grid
// can react to resizing instead of staying locked to a fixed column count.
function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqSm = window.matchMedia("(min-width: 640px)");

    const update = () => {
      if (mqLg.matches) setBreakpoint("lg");
      else if (mqMd.matches) setBreakpoint("md");
      else if (mqSm.matches) setBreakpoint("sm");
      else setBreakpoint("base");
    };

    update();
    mqLg.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}

// Caps the column count (and therefore cards-per-page, since we show one
// row per page) based on screen size. This is the actual fix: previously
// `cols` was a fixed number regardless of viewport, so on small screens
// 4-5 columns squeezed each card down to a sliver — narrow enough that
// names/roles got cut off. Now fewer, wider cards show per page instead.
function columnsForBreakpoint(breakpoint: Breakpoint, maxCols: number) {
  switch (breakpoint) {
    case "lg":
      return maxCols;
    case "md":
      return Math.min(3, maxCols);
    case "sm":
      return Math.min(2, maxCols);
    default:
      return 1;
  }
}

interface TierProps {
  label: string;
  members: MenuItem[];
  maxCols: number; // column count at the 'lg' breakpoint and above
}

function Tier({ label, members, maxCols }: TierProps) {
  const breakpoint = useBreakpoint();
  const cols = columnsForBreakpoint(breakpoint, maxCols);
  const perPage = cols; // one full row of cards per page
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prevCols, setPrevCols] = useState(cols);

  // If resizing changes how many columns fit, the current page can end up
  // out of range (e.g. you were on page 3 of 4-per-row, now it's 2-per-row
  // and there are more pages). Snap back to the first page whenever the
  // column count changes so we never render an empty/invalid page.
  if (cols !== prevCols) {
    setPrevCols(cols);
    setPage(0);
  }

  const totalPages = Math.ceil(members.length / perPage);

  const visible = members.slice(page * perPage, page * perPage + perPage);
  const showNav = members.length > perPage;

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <p className="text-xs font-medium tracking-widest uppercase text-slate-400">
          {label}
        </p>
        {showNav && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {page + 1} / {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => go(page - 1)}
                disabled={page === 0}
                aria-label="Previous"
                className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => go(page + 1)}
                disabled={page === totalPages - 1}
                aria-label="Next"
                className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            // `cols` is included in the key so a breakpoint change
            // (which also resets `page` above) always triggers a
            // fresh enter animation instead of a stale exit/enter
            // mismatch between two different grid sizes.
            key={`${page}-${cols}`}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gap: "12px",
              justifyContent: "start",
            }}
          >
            {visible.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-1">
            Who we are
          </p>
          <h2 className={`text-3xl sm:text-4xl ${koulen.className}`}>
            Meet the team
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          <Tier label="Leadership" members={leadership} maxCols={4} />
          <Tier label="Vice Presidents" members={vicePresidents} maxCols={5} />
        </div>
      </div>
    </section>
  );
}

