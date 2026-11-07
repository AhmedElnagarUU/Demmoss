import { Fragment } from "react";
import { rtlSafe } from "./styles";

// The logo of the source: thin letters with a bold "&" ("Hartwell & Co. Realty"). A name without " & " is shown plain.
export function BrandName({ name }: { name: string }) {
  const parts = name.split(" & ");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 ? (
            <>
              {" "}
              <b className="font-semibold">&amp;</b>{" "}
            </>
          ) : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}

const logoClass = `whitespace-nowrap text-sm font-light uppercase tracking-[0.3em] max-[460px]:text-[11px] max-[460px]:tracking-[0.18em] rtl:font-medium ${rtlSafe}`;
export const logoLinkClass = `${logoClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`;
