import R from '../ramda';

export default function mergeAction(oldAction, newAction) {
  return R.mergeWith(
    (first, second) => second || first,
    oldAction,
    newAction
  );
}