export const notANaN = (it) => {
  // eslint-disable-next-line no-self-compare -- NaN check
  if (it === it) return it;
  throw RangeError('NaN is not allowed');
};