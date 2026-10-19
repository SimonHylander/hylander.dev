import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-2">
      <h1 className="text-3xl">Page not found</h1>
      <p>
        This page does not exist. <Link href="/">Go to the home page</Link>.
      </p>
    </section>
  );
}
