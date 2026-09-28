// components/content/CollectionFooter.tsx
import LoadMoreButton from "./LoadMoreButton";

interface CollectionFooterProps {
  error: string | null;
  hasMore: boolean;
  loading: boolean;
  collection: string;
  onLoadMore: () => void;
}

export function CollectionFooter({
  error,
  hasMore,
  loading,
  collection,
  onLoadMore,
}: CollectionFooterProps) {
  return (
    <>
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
      {hasMore && (
        <LoadMoreButton
          loading={loading}
          collection={collection}
          onClick={onLoadMore}
        />
      )}
    </>
  );
}
