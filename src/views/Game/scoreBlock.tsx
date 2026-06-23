import { Progress } from "@/components/ui/progress";

type ScoreBlockProps = {
  score: number; // 0–100
};

export function ScoreBlock({ score }: ScoreBlockProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-6 space-y-4">

      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Pontuação
        </p>

        <p className="text-5xl font-bold text-primary">
          {score}%
        </p>
      </div>

      <Progress value={score} className="h-2" />

    </div>
  );
}