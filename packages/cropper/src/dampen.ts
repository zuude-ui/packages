export function dampen(
  val: number,
  [min, max]: [number, number],
  dampenFactor = 2
) {
  if (val > max) {
    const extra = val - max;
    const dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra);
    return max + dampenedExtra * dampenFactor;
  } else if (val < min) {
    const extra = val - min;
    const dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra);
    return min + dampenedExtra * dampenFactor;
  } else {
    return val;
  }
}
