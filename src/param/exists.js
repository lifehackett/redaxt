import R from '../ramda';
import createValidator from '../utils/create-validator';

export default function exists(argName) {
  return createValidator(argName, ({ type, argName, arg }) => {
    if (R.isNil(arg)) {
      throw new TypeError(`${type} action parameter ${argName} must be defined: ${arg}`);
    }
  });
}
