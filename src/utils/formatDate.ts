export function formatDate(date: Date | string, delimiter: string = '-'): string {
  if (typeof date === 'string') {
    date = new Date(`${date}T00:00`);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${delimiter}${month}${delimiter}${day}`;
}

export function getTodayNewDate(): Date {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return new Date(`${year}-${month}-${day}T00:00`);
}

export function getEighteenYearsAgoDate(): Date {
    const today = getTodayNewDate();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

    return eighteenYearsAgo;
}

export function getEighteenYearsAgoString(): string {
    return formatDate(getEighteenYearsAgoDate());
}