import R from '../ramda';

export default function mergeAction(oldAction, newAction) {
  return RI.mergeWith(
    (first, second) => second || first,
    oldAction,
    newAction
  );
}