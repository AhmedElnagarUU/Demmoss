import { Fragment } from "react";
import { rtlSafe } from "./styles";

// The logo of the source: thin letters, the last word in weight 500 ("Solenne **Estates**"). A one-word name is shown plain.
export function BrandName({ name }: { name: string }) {
  const words = name.split(" ");
  const last = words.length > 1 ? words.pop() : undefined;
  return (
    <>
      {words.join(" ")}
      {last ? (
        <>
          {" "}
          <b className="font-medium">{last}</b>
        </>
      ) : null}
    </>
  );
}

// The first word of the name, for the big word in the footer.
export function firstWord(name: string): string {
  return name.split(" ")[0] ?? name;
}

// Text with a line feed shows as lines. A space stays before every break so the heading still reads as one sentence.
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {part}
          {index < parts.length - 1 ? (
            <>
              {" "}
              <br />
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

const logoClass = `whitespace-nowrap text-lg font-extralight uppercase tracking-[0.42em] max-[640px]:text-[15px] max-[640px]:tracking-[0.3em] rtl:font-light ${rtlSafe}`;
export const logoLinkClass = `${logoClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`;
