// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
export const createIterResultObject = (value, done) => {
  return { value: value, done: done };
};
