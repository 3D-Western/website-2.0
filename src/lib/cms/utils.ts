import { Where } from "payload";

export const CMSEnabled = (): boolean => {
  if (process.env.NEXT_PUBLIC_CMS_ENABLED === "false") {
    return false;
  }
  return true;
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const cmsEnabledFallback = async (
  path: string,
  options?: RequestInit,
) => {
  if (process.env.NEXT_PUBLIC_CMS_ENABLED === "false") {
    const { getMockResponse } = await import("@/mocks/handlers-direct");
    const res = await getMockResponse(path, options);
    if (!res.ok) throw new Error(`Mock CMS request failed: ${res.status}`);
    const resolved = await res.json();
    if (!resolved) return { status: "not-found", response: resolved };
    return { response: resolved, status: "ok" };
  }
  return { response: null, status: "CMS Enabled" };
};

export function coerceValue(value: string) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  return value;
}

export function whereFromSearchParams(
  params: URLSearchParams,
): Where | undefined {
  const where: Where = {};
  for (const [key, value] of params.entries()) {
    const match = /^where\[(.+)\]\[(.+)\]$/.exec(key);
    if (!match) continue;
    const [, field, operator] = match;
    where[field] = {
      [operator]:
        operator === "in"
          ? value.split(",").map(coerceValue)
          : coerceValue(value),
    };
  }
  return Object.keys(where).length > 0 ? where : undefined;
}
