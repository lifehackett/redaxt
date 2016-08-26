# redaxt
An opinionated declarative set of factory functions for creating Redux actions.

(Note: This library is pretty new. I expect the existing API to be relatively stable, but plan to add to the core set of utility functions)

### TODO
- [ ] Add additional Param validation builders
- [ ] Add additional Meta builders
- [ ] Add Param transform builders
- [ ] Add documentation of Param transformer
- [ ] Make helpers like `createValidator` public
- [ ] Provide documentation on writing custom builders
- [ ] Unit Tests
- [ ] Create pre-transpiled dist folder

# Getting Started
```
npm i --save redaxt
```

# Opinionated
* Redux actions should have a consistent structure.
* In order to achieve a consistent structure you need action creators/factories
* That structure should be of the form `{ type, data, meta }`
* Validating inputs to action creators is a good idea because it is the primary avenue for communication between React and Redux as well as between Redux services. Doing so reduces the need to defensively program in these services.

# Action Creators

Action Creators are essentially factories. They receive data as parameters and return an object of the form `{ type, data, meta }`. They ensure a consistent structure to Action objects.  

Action Object
```js
{
  type: 'ACTION_TYPE' // Referenced as a constant. Used by subscribers to determine interest
  data: {} // Serves as a container for passing data with an action
  meta: {} // Serves as a container for describing the action
}
```

Actions are a good place to program defensively as they serve as the primary vehicle for communication between parts of the application. Validating parameters helps keep action subscribers from having to do so.

Anatomy of an action creator
```js
function fetchFoosSuccess(foos) {
  // Make some assertions about foos.
  if (!foos) {
    throw new Error();
  }
  
  if (!R.is(Array, foos)) {
    throw new Error();
  }
  
  if (!isFoos(foos)) {
    throw new Error();
  }
  
  // Define the action type
  const type = 'FETCH_FOOS_SUCCESS'
  // Define the data
  const data = { foos }
  // Define the meta properties
  const meta = { isAsyncComplete: true }
  
  // Pass all three to an action creator factory
  return createAction(type, data, meta);
}
```

# Redaxt Action Creators
This quickly becomes repetitive across data types. This same behavior can be done in a more declarative way.

Here is the above example recreated with Redaxt
```js
// Create action takes 1-N of these functions.
const fetchFoosSuccess = createAction(
  Meta.endBlockingAsync,
  Param.exists('foos'),
  Param.is('foos', Array),
  type(FETCH_FOOS_SUCCESS)
);
```

Redaxt exposes a factory function `createAction` that takes 1-N builder functions and returns an action object.

Builder functions receive action objects, apply some logic (typically some sort of validation or transform) and then return an action object.  `createAction` acts as a sort of pipeline marshalling actions throught the builders.

**Important Difference:**
Calling a Redaxt action creator is slightly different. You must wrap your parameters that you pass to the action creator in an object container.
Action Creator: `dispatch(actionCreator(param1, param2))`
Redaxt Action Creator: `dispatch(actionCreator({ param1, param2 }))`

### Type

Type is considered a required property of an action object.  `createAction` will throw an error if you forget this property.
```js
type('ACTION_TYPE')
```

### Params
Param builders are used to validate or transform parameters passed to the action creator before they get assembled into the `data: {}` property of the action object

###### exists
Validates that the parameter matching propName is not null or undefined
```js
Param.exists('propName')
```

###### notEmpty
Validates that the parameter matching propName is not empty `[], {}, ''`
```js
Param.notEmpty('propName')
```

###### is
Validates that the parameter matching propName is of the specified type
```js
Param.is('propName', type)
```

###### oneOf
Validates that the parameter matching propName is one of the specified values
```js
Param.oneOf('propName', [arrayOfPossibleValues])
```


### Meta
Sometimes you want to apply meta attributes to an action object typically lending itself to being handled at a more global level.

###### blockingAsync
Decorates the action object meta property `{ meta: { isAsyncPending: true|false }}`. Typically used for handling loading state at a more global level.

```js
Meta.beginBlockingAsync,
Meta.endBlockingAsync,
```



