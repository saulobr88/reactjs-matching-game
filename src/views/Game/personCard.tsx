type PersonCardProps = {
  title: string;
  fullName: string;
  birthDate: string;
};

export function PersonCard({
  title,
  fullName,
  birthDate,
}: PersonCardProps) {
  return (
    <div className="rounded-xl border bg-background p-4 space-y-4">

      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      <div className="space-y-2">

        <div>
          <p className="text-xs text-muted-foreground">
            Nome
          </p>

          <p className="font-medium">
            {fullName}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Data de nascimento
          </p>

          <p className="font-medium">
            {birthDate}
          </p>
        </div>

      </div>
    </div>
  );
}