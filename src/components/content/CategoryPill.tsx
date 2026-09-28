export default function CategoryPill({
  title,
  handleCategory,
  category,
}: {
  title: string;
  handleCategory: (value: string) => void;
  category: string;
}) {
  return (
    <button
      onClick={() => handleCategory(title)}
      aria-pressed={category === title}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide
                    transition-colors focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-purple-400
                    ${
                      category === title
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
    >
      {title}
    </button>
  );
}
