"use client";

import { useMenu } from "@/context/MenuContext";
import DashButton from "./DashButton";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { DASHBOARD_TRAINING_URL } from "@/components/data/links";

interface MobileMenuProps {
  isActive: (path: string) => boolean;
  navLinks: {
    path: string;
    label: string;
    external?: boolean;
  }[];
}

export default function MobileMenu({ isActive, navLinks }: MobileMenuProps) {
  const { isMenuOpen } = useMenu();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-6 lg:hidden",
        "bg-header/40 backdrop-blur-xl",
        "transition-opacity duration-300",
        isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isMenuOpen}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          link={link}
          active={isActive(link.path)}
          mobile={true}
        />
      ))}

      <div className="h-px w-40 bg-primary-text/15 sm:hidden" />

      <div className="flex flex-col gap-3 sm:hidden">
        <Button
          variant="outlined"
          size="pill"
          asChild
          className="px-7 py-2.5 text-base"
        >
          <a
            href={DASHBOARD_TRAINING_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Training
          </a>
        </Button>
        <DashButton className="px-7 py-2.5 text-base" />
      </div>
    </div>
  );
}
