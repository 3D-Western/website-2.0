"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import DashButton from "./DashButton";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
import Logo from "../Logo";
import { navLinks } from "../data/navLinks";
import { Button } from "../ui/button";
import { DASHBOARD_TRAINING_URL } from "@/components/data/links";
// Prevent scrolling via wheel, touch, and keyboard events
const preventDefault = (e: Event) => {
  e.preventDefault();
};

const preventKeyScroll = (e: KeyboardEvent) => {
  const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up/down, home, end, arrows
  if (scrollKeys.includes(e.keyCode)) {
    e.preventDefault();
  }
};

export function NavBar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  // Lock scrolling while the menu is open — without moving the page.
  // (Setting position:fixed on <body> shifts scroll to 0 and then jumps
  //  back on close, which reads as a teleport + auto-scroll.)
  useEffect(() => {
    if (!isMenuOpen) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, { passive: false });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
    <nav
      id="top"
      className={`fixed top-0 left-0 right-0 z-50 bg-header backdrop-blur-sm transition-[border-color] duration-300 border-b ${
        isMenuOpen ? "border-transparent" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/">
          <Logo></Logo>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink link={link} active={isActive(link.path)} key={link.path} />
          ))}
        </div>

        {/* Right cluster: action buttons (desktop/tablet) + hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {/* Dashboard + Training Buttons --- VISIBLE ON DESKTOP/TABLET */}
          <div className="hidden sm:flex gap-2">
            <Button variant="outlined" size="pill" asChild>
              <a
                href={DASHBOARD_TRAINING_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Training
              </a>
            </Button>
            <DashButton />
          </div>

          {/** Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

    </nav>
    <MobileMenu isActive={isActive} navLinks={navLinks} />
    </>
  );
}
