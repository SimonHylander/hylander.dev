import { profile } from "@/content/profile";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = profile.name;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({ eyebrow: new URL(profile.url).host, title: profile.name, description: profile.positioning });
}
