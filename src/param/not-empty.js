import R from '../ramda';
import createValidator from '../utils/create-validator';

export default function notEmpty(argName) {
  return createValidator(argName, ({ type, argName, arg }) => {
    if (R.isEmpty(arg)) {
      throw new TypeError(`${type} action parameter ${argName} must not be empty: ${arg}`);
    }
  });
}