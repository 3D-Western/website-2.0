"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import type { EquipmentItem } from "@/components/data/equipment";

const IMAGE_WIDTH = 260;
const IMAGE_HEIGHT = 380;
const TEXT_WIDTH = 340;

interface EquipmentCardDesktopProps {
  item: EquipmentItem;
  isActive: boolean;
  onHover: () => void;
}

export function EquipmentCardDesktop({
  item,
  isActive,
  onHover,
}: EquipmentCardDesktopProps) {
  return (
    <div
      onMouseEnter={onHover}
      className="clip-corners-sm flex shrink-0 overflow-hidden bg-black-bg"
      style={{ height: IMAGE_HEIGHT }}
    >
      {/* Image — fixed size always, never resizes, never scales */}
      <div
        className="relative shrink-0"
        style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
      >
        <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw" className="object-cover" />
      </div>

      {/* Text panel — width 0 unless active, only place the title lives */}
      <div
        className="h-full shrink-0 overflow-hidden bg-grey-bg transition-[width] duration-500 ease-out"
        style={{ width: isActive ? TEXT_WIDTH : 0 }}
      >
        <div
          style={{ width: TEXT_WIDTH }}
          className="flex h-full flex-col justify-center gap-5 p-8"
        >
          <h4>{item.title}</h4>
          <p className="text-sm leading-relaxed text-secondary-text">
            {item.description}
          </p>
          <div className="flex items-center gap-1.5 text-sm font-medium text-purple-light">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {item.location}
          </div>
        </div>
      </div>
    </div>
  );
}