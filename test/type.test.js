import { expect } from 'chai';
import { type } from '../src';

describe('type', () => {
  let actual;
  
  before(() => {
    actual = type('ACTION_TYPE');
  });
  
  it('returns a function', () => {
    expect(actual).a('function');
  });
  
  it('returns a curried function expecting one more parameter', () => {
    expect(actual).to.have.length(1);
  });
  
  it('returns an object with type "ACTION_TYPE" when arity is reached', () => {
    actual = actual({});
    expect(actual).to.deep.equal({ type: 'ACTION_TYPE' });
  });
});