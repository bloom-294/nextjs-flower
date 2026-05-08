export const API_BASE_URL = (() => {
  const v = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!v) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL (public env).");
  }
  return v;
})();
