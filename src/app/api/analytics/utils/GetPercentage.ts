export function getPercentage(compData: number, actualData: number): string {
  const diff = actualData - compData;
  const per = diff * 100 * 10;
  return per.toFixed(2) + "%";
}
