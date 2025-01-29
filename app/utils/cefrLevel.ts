export const getCefrLevel = (score: number): string => {
  if (score <= 20) return "A1";
  if (score <= 40) return "A2";
  if (score <= 60) return "B1";
  if (score <= 80) return "B2";
  if (score <= 95) return "C1";
  return "C2";
};
