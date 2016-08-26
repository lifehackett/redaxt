import R from '../ramda';
import createValidator from '../utils/create-validator';

export default function is(argName, items) {
  return createValidator(argName, ({ type, argName, arg }) => {
    if (!R.contains(arg, items)) {
      throw new TypeError(`${type} action parameter ${argName} must be one of: ${items.join(', ')}`)
    }
  });
}
