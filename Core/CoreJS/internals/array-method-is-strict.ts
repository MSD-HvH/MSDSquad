'use strict';
import { fails } from './fails';

export const arrayMethodIsStrict = function (METHOD_NAME, argument) {
  const method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};
