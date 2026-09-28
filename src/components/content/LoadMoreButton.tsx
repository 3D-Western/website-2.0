interface LoadMoreProps {
  collection: string;
  onClick: () => void;
  loading: boolean;
}

export default function LoadMoreButton({
  collection,
  onClick,
  loading,
}: LoadMoreProps) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-8 py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Loading…" : `Load more ${collection}`}
      </button>
    </div>
  );
}
