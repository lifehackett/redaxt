import R from 'ramda';

const reduceObj = R.curry((fn, acc, obj) => R.reduce(fn, acc, R.toPairs(obj)));

export default {
  curry: R.curry,
  isNil: R.isNil,
  isEmpty: R.isEmpty,
  is: R.is,
  contains: R.contains,
  mergeWith: R.mergeWith,
  reduce: R.reduce,
  reduceObj,
}