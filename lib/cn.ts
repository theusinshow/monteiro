type ClassValue = string | number | null | false | undefined;

/** Minimal className joiner — no runtime deps. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
