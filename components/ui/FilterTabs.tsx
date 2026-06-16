"use client";

import { cn } from "@/lib/cn";

type FilterTabsProps<T extends string> = {
  options: readonly T[];
  value: T | "Todos";
  onChange: (value: T | "Todos") => void;
  className?: string;
};

/**
 * Editorial filter — text options separated by hairlines, the active one
 * marked by the accent brick and an underline. No pill chrome.
 */
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: FilterTabsProps<T>) {
  const all: (T | "Todos")[] = ["Todos", ...options];

  return (
    <div
      role="tablist"
      aria-label="Filtrar projetos"
      className={cn("flex flex-wrap items-center gap-6", className)}
    >
      {all.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option)}
            className={cn(
              "py-3 text-sm transition-colors duration-300 ease-editorial",
              active
                ? "border-b border-accent text-accent"
                : "border-b border-transparent text-graphite hover:text-ink",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
