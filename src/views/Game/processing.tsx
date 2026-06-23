import { Loader2 } from "lucide-react";

export function Processing() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />

      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">
          Processando...
        </h3>

        <p className="text-sm text-muted-foreground">
          Aguarde alguns instantes.
        </p>
      </div>
    </div>
  );
}