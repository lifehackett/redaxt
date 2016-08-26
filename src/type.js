import R from './ramda';

export default R.curry((type, action) => {
  return { type };
});