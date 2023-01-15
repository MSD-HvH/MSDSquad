import { arraySlice } from './array-slice-simple';

const floor = Math.floor;

export const mergeSort = function (array, comparefn) {
  const length = array.length;
  const middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

const insertionSort = function (array, comparefn) {
  const length = array.length;
  let i = 1;
  let element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

const merge = function (array, left, right, comparefn) {
  const llength = left.length;
  const rlength = right.length;
  let lindex = 0;
  let rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;
