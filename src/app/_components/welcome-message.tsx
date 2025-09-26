import { WandSparkles } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="flex h-full min-h-[500px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <WandSparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Let&apos;s Create Some Magic
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fill out your marketing brief on the left to get started.
        </p>
      </div>
    </div>
  );
}
