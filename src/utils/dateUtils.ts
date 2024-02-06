export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};

export const getFormattedDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
