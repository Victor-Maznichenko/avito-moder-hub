export const formatPercent = (value: number, fraction = 2) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: fraction
  }).format(value / 100);

export const secondsToMinutes = (seconds: number) => `${(seconds / 60).toFixed(1)} мин`;
