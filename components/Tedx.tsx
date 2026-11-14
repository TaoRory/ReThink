import { Fragment } from "react";

/** The word "TEDx" is always TED red, wherever it appears. */
export function Tedx() {
  return <span className="text-neon-red">TEDx</span>;
}

/** Renders a dictionary string, painting every "TEDx" in it TED red. */
export function TedxText({ children }: { children: string }) {
  const parts = children.split("TEDx");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <Tedx />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
