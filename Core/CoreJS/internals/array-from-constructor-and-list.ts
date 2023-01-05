import { lengthOfArrayLike } from "./length-of-array-like";

export const arrayFromConstructorAndList = (Constructor, list) => {
  let index = 0;
  const length = lengthOfArrayLike(list);
  const result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};
