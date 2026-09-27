import Link from "next/link";
import { Button } from "../ui/button";
import { DASHBOARD_URL } from "@/components/data/links";

export default function DashButton({ className }: { className?: string }) {
  return (
    <Button size="pill" variant="gradient" asChild className={className}>
      <Link href={DASHBOARD_URL}>Go To Dashboard</Link>
    </Button>
  );
}
