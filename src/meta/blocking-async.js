export function beginBlockingAsync({ meta }) {
  const _meta = Object.assign({}, meta, { isAsyncPending: true });
  return { meta: _meta };
}

export function endBlockingAsync({ meta }) {
  const _meta = Object.assign({}, meta, { isAsyncPending: false });
  return { meta: _meta };
}