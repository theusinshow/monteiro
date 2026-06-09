import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  name: string;
  className?: string;
};

const fieldBase =
  "w-full border-0 border-b border-line bg-transparent py-3 text-ink placeholder:text-graphite/60 outline-none transition-colors duration-300 ease-editorial focus:border-ink";

const labelBase = "label block";

/** Minimal underline-only text input. */
export function Field({
  label,
  name,
  className,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("group", className)}>
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
      <input id={name} name={name} className={cn(fieldBase, "mt-2")} {...props} />
    </div>
  );
}

/** Minimal underline-only textarea. */
export function TextField({
  label,
  name,
  className,
  rows = 4,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={cn("group", className)}>
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={cn(fieldBase, "mt-2 resize-none")}
        {...props}
      />
    </div>
  );
}
