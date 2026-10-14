import { Mail, MapPin } from "lucide-react";
import FooterSecton from "./footer/FooterSection";

export default function ContactInfo() {
  return (
    <FooterSecton title="CONTACT">
      <div className="flex flex-col gap-4">
        <a href="mailto:contact@3dwestern.ca" className="flex gap-2">
          <Mail size={24} className="text-footer-text shrink-0"></Mail>
          <span className="text-footer-text flex-1 self-center">
            contact@3dwestern.ca
          </span>
        </a>
        <a
          href="https://maps.app.goo.gl/2LSMgsLUtEdmRzke7"
          className="flex gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={24} className="text-footer-text shrink-0"></MapPin>

          <span className="text-footer-text text-pretty flex-1 self-end">
            Ronald D. Schmeichel Building for Entrepreneurship and Innovation,
            Western University
          </span>
        </a>
      </div>
    </FooterSecton>
  );
}
