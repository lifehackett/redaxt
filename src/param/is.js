import R from '../ramda';
import createValidator from '../utils/create-validator';

export default function is(argName, jsType) {
  return createValidator(argName, ({ type, argName, arg }) => {
    if (!R.is(jsType, arg)) {
      throw new TypeError(`${type} action parameter ${argName} is invalid type: ${arg}`);
    }
  });
}