import { expect } from 'chai';
import { Meta } from '../../src';

describe('blocking-async', () => {
  it('beginBlockingAsync returns an object with meta.isAsyncPending equal to true', () => {
    const actual = Meta.beginBlockingAsync({});
    expect(actual).to.deep.equal({ meta: { isAsyncPending: true }});
  });
  
  it('endBlockingAsync returns an object with meta.isAsyncPending equal to false', () => {
    const actual = Meta.endBlockingAsync({});
    expect(actual).to.deep.equal({ meta: { isAsyncPending: false }});
  });
});