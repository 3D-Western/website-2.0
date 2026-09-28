"use client";
import { useCallback, useState } from "react";

type PaginatedFetcher<T> = (args: {
  limit: number;
  page: number;
}) => Promise<T[]>;

export function usePaginatedCollection<T>(
  initialItems: T[],
  fetcher: PaginatedFetcher<T>,
  pageSize: number,
) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialItems.length === pageSize);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    const nextPage = page + 1;
    try {
      const next = await fetcher({ limit: pageSize, page: nextPage });
      setItems((prev) => [...prev, ...next]);
      setPage(nextPage);
      setHasMore(next.length === pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, fetcher, pageSize]);

  return { items, loading, hasMore, error, loadMore };
}
