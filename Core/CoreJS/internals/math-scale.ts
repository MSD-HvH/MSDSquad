// `Math.scale` method implementation
// https://rwaldron.github.io/proposal-math-extensions/
// @ts-ignore
export const scale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  const nx = +x;
  const nInLow = +inLow;
  const nInHigh = +inHigh;
  const nOutLow = +outLow;
  const nOutHigh = +outHigh;
  // eslint-disable-next-line no-self-compare -- NaN check
  if (nx != nx || nInLow != nInLow || nInHigh != nInHigh || nOutLow != nOutLow || nOutHigh != nOutHigh) return NaN;
  if (nx === Infinity || nx === -Infinity) return nx;
  return (nx - nInLow) * (nOutHigh - nOutLow) / (nInHigh - nInLow) + nOutLow;
};