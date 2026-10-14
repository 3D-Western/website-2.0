import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import Logo from "./Logo";
import FooterLinks from "./navigation/FooterLinks";
import ContactInfo from "./ContactInfo";

function SocialIcons() {
  const cls =
    "flex h-9 w-9 items-center justify-center rounded-full border border-[#8B949E33] text-footer-text transition-colors hover:border-purple-light hover:text-purple-light";
  return (
    <>
      <a
        href="https://www.instagram.com/3dw_makerspaces/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="3D Western on Instagram"
        className={cls}
      >
        <Instagram size={18} />
      </a>
      <a
        href="https://www.linkedin.com/company/3d-western/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="3D Western on LinkedIn"
        className={cls}
      >
        <Linkedin size={18} />
      </a>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-footer text-footer-text font-medium p-8">
      <div className="z-1 absolute w-[400px] h-[350px] p-8 blur-xs opacity-20 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-24">
        <Image src="/logo-2.png" alt="3DW Logo" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw" className="object-cover" />
      </div>
      <div className="relative z-10">
        <div className="flex flex-col gap-8">
          {/* ---------- Mobile layout ---------- */}
          <div className="flex flex-col gap-10 sm:hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Link href="/" aria-label="3D Western home" className="-ml-5 w-fit">
                  <Logo className="h-12 w-[208px]" />
                </Link>
                <span className="text-small">
                  Empowering Students to Build &amp; Create.
                </span>
              </div>
              <div className="flex shrink-0 gap-3">
                <SocialIcons />
              </div>
            </div>

            <div className="flex gap-16">
              <div className="shrink-0">
                <FooterLinks />
              </div>
              <div className="min-w-0 flex-1">
                <ContactInfo />
              </div>
            </div>
          </div>

          {/* ---------- Desktop layout ---------- */}
          <div
            className="
    hidden gap-8 sm:grid
    sm:grid-cols-[2fr_1fr_1fr]
    sm:[grid-template-areas:'brand_links_contact']
  "
          >
            {/* Branding */}
            <div className="[grid-area:brand] flex flex-col gap-2">
              <Link href="/" aria-label="3D Western home" className="-ml-5 w-fit">
                <Logo className="h-14 w-[243px]" />
              </Link>
              <span className="text-small">
                Empowering Students to Build &amp; Create.
              </span>
              <div className="mt-2 flex gap-3">
                <SocialIcons />
              </div>
            </div>

            {/* Footer Link List */}
            <div className="[grid-area:links]">
              <FooterLinks />
            </div>

            {/* Contact Information */}
            <div className="[grid-area:contact]">
              <ContactInfo />
            </div>
          </div>
          {/* Splitter Horizontal Line */}
          <hr className="h-px text-[#8B949E33]" />

          {/* Copyright statement + Go To Top button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-secondary-text text-small">
                Copyright © 2026, 3dwestern.ca, All Rights Reserved.
              </span>
              <a
                href="https://www.3dwestern.ca/documents/3DW_ToS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-text text-small w-fit transition-colors hover:text-purple-light"
              >
                Terms of Service
              </a>
            </div>
            <Button variant="outlined" size="pill" asChild>
              <Link href="#top">Back to top</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
