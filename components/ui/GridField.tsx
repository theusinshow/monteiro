/**
 * The persistent global grid: a fixed, full-height centered band of vertical
 * hairlines (responsive 4 / 6 / 8 columns, driven by --grid-cols). Mounted once
 * at the app root, identical on every route. The vertical field is the ONLY
 * persistent structure — horizontals come from element edges (see Rule).
 * Structure, never decoration: aria-hidden, pointer-events none, behind content.
 */
export function GridField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div
        className="relative h-full w-full"
        style={{
          maxWidth: "var(--grid-max)",
          // a 1px line at the start of every column (includes the left edge);
          // --col responds to --grid-cols at each breakpoint.
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-line) 0, var(--color-line) 1px, transparent 1px, transparent var(--col))",
        }}
      >
        {/* explicit right band edge (the repeat's final line lands just outside) */}
        <span className="absolute inset-y-0 right-0 w-px bg-line" />
      </div>
    </div>
  );
}
