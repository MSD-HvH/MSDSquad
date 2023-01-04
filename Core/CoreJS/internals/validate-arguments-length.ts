export const validateArgumentsLength = (passed, required) => {
  if (passed < required) throw TypeError('Not enough arguments');
  return passed;
};