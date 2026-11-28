/** Build-time image metadata. vite.config.ts makes every image import under src/content return this. */
type ImageMetadata = { src: string; width: number; height: number };

/** A screenshot in MDX prose. Import the image in the MDX file and pass it as `src`. */
export function Figure({ src, alt, caption }: { src: ImageMetadata; alt: string; caption?: string }) {
  return (
    <figure>
      <img
        src={src.src}
        alt={alt}
        width={src.width}
        height={src.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-md border border-line"
      />
      {caption && <figcaption className="mt-2 text-meta text-muted">{caption}</figcaption>}
    </figure>
  );
}
