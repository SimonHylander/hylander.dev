import { bragdoc } from "~/data/bragdoc";

import BragdocList from "../_components/bragdoc/bragdoc";

export default async function BragDocPage() {

  return (
      <section
        className={`relative z-0 mx-auto max-w-7xl py-10 sm:py-16 sm:pt-0`}
      >
        {bragdoc[0] && (
          <BragdocList bragdoc={bragdoc[0]} />
        )}
      </section>
  );
}

