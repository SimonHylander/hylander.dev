import { Card as CardComponent, CardContent } from "@hylanderdev/ui/components/card";

export function Card({ title, children, props }: { title: string; children: React.ReactNode; props?: React.ComponentProps<typeof CardComponent> }) {
  return (
    <CardComponent className="relative" {...props}>
      <CardContent>
        <div className="bg-secondary absolute -top-4 left-[10%] w-96 flex items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">{title}</h2>
          </div>
        </div>

        {children}
      </CardContent>
    </CardComponent>
  );
}
