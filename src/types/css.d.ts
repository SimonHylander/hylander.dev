import "react";

// Lets `style` set CSS custom properties (`--i`) with type checking on everything else.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
