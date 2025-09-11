export function getFilterDate(day: number): Date {
  const currentDate = new Date();
  const dayBeforeDate = new Date();
  dayBeforeDate.setDate(currentDate.getDate() - day);
  return dayBeforeDate;
}
