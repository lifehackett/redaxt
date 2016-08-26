import R from './ramda';
import mergeAction from './utils/merge-action';

export default function createAction(...creators) {
  const { type, params, meta } = R.reduce(
    (acc, creator) => mergeAction(acc, creator(acc)),
    { params: {}, meta: {} },
    creators
  );
  
  return function (args = {}) {
    const data = R.reduceObj((acc, [key, value]) => {
      acc[key] = params.hasOwnProperty(key) ?
                 params[key](value) :
                 value;
      return acc;
    }, {}, args);
    
    if (typeof type !== 'string') {
      throw new TypeError(`createAction() parameter "type" not a string: ${type}`)
    }
    
    if (typeof data !== 'object') {
      throw new TypeError(`createAction() parameter "data" not an object: ${data}`)
    }
    
    if (typeof meta !== 'object') {
      throw new TypeError(`createAction() parameter "meta" not an object: ${meta}`)
    }
    
    return {
      type,
      data,
      meta,
    }
  }
}