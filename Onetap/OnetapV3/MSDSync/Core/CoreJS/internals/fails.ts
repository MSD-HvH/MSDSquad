export const fails = (exec) => {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};
