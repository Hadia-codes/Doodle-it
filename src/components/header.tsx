import { PencilRuler } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <PencilRuler className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">DoodleSpark</h1>
        </div>
      </div>
    </header>
  );
}
