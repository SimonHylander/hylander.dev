import LogoChrome from "~/components/navigation/navigation";

export function SiteShell({
  children,
  chrome = "logo-only",
}: {
  children: React.ReactNode;
  chrome?: "none" | "logo-only";
}) {
  return (
    <>
      {chrome !== "none" && <LogoChrome />}
      {children}
    </>
  );
}
