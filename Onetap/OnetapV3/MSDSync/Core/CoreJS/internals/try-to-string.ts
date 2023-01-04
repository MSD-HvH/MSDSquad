export const tryToString = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};
