export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center shadow-md py-4 bg-background border border-secondary">
      <h2 className="text-4xl font-bold text-secondary">{title}</h2>
    </div>
  );
}
