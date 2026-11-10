import Image, { type StaticImageData } from "next/image";

/** A screenshot in MDX prose. Import the image in the MDX file and pass it as `src`. */
export function Figure({ src, alt, caption }: { src: StaticImageData; alt: string; caption?: string }) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes="(min-width: 44rem) 44rem, 100vw"
        className="h-auto w-full rounded-md border border-line"
      />
      {caption && <figcaption className="mt-2 text-meta text-muted">{caption}</figcaption>}
    </figure>
  );
}
