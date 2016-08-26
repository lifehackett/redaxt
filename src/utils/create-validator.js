export default function createValidator(argName, test) {
  return function validator({ params, type = 'UNKNOWN_ACTION_TYPE' }) {
    function chain(next) {
      return function validate(arg) {
        test({ type, argName, arg });
        
        return next ?
               next(arg) :
               arg;
      }
    }
    
    // On the first pass `params[argName]` will be undefined, so `next` will be undefined, so `validate` will return the arg
    // Each subsequent pass will get the previous validate function provided as `next` so will recursively call those
    const _params = Object.assign({}, params, {
      [argName]: chain(params[argName])
    });
    
    return { params: _params };
  };
}