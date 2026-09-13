import type { ReactNode } from "react";

interface RelatedItemsSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Shared shell for a "related items" section at the bottom of a detail page
 * (e.g. "More Projects" on a project page, "More From The Blog" on a post).
 * Only the outer chrome — heading, spacing, background — is shared; the
 * actual grid/list markup is passed in as children so each page can keep
 * using whichever card layout actually fits its content (a 3-up grid of
 * square tiles for projects, a stacked list of wide cards for blog posts).
 */
export function RelatedItemsSection({ title, children }: RelatedItemsSectionProps) {
  return (
    <section className="py-16 bg-black-bg border-t border-b-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}
