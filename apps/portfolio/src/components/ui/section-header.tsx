export function SectionHeader({ title }: { title: string }) {
  return (
    <header className="py-6 md:py-8">
      <h2 className="text-center text-2xl font-bold text-secondary md:text-4xl">
        {title}
      </h2>
    </header>
  );
}
