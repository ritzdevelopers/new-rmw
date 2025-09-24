export function getPercentage(compData: number, actualData: number): string {
  if (compData === 0) {
    return "∞%"; // agar comparison data 0 hai to infinite growth hoga
  }
  const diff = actualData - compData;
  const per = (diff / compData) * 100; // sahi formula
  return per.toFixed(2) + "%";
}
