'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should not mutate the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const copy = [...array];

    array.reduce((prev, curr) => prev + curr, 0);

    expect(array).toEqual(copy);
  });

  it('should return a value', () => {
    const arr = [1, 2, 3];

    const result = arr.reduce((acc, x) => acc + x, 0);

    expect(result).toBeDefined();
  });

  it('should return the same type as initial value', () => {
    const arr = [1, 2, 3];

    const result = arr.reduce((acc, x) => {
      acc.push(x);

      return acc;
    }, []);

    expect(Array.isArray(result)).toBe(true);
  });

  it('should call callback once per element', () => {
    const arr = [1, 2, 3];
    const cb = jest.fn((acc, x) => acc + x);

    arr.reduce(cb, 0);

    expect(cb).toHaveBeenCalledTimes(arr.length);
  });

  it('should pass accumulator, current value, index and array', () => {
    const arr = [10, 20];
    const cb = jest.fn((acc, x) => acc + x);

    arr.reduce(cb, 0);

    expect(cb).toHaveBeenNthCalledWith(
      1,
      0,
      10,
      0,
      arr
    );
  });

  it('should not call callback for empty array', () => {
    const cb = jest.fn();

    const result = [].reduce(cb, 100);

    expect(cb).not.toHaveBeenCalled();
    expect(result).toBe(100);
  });

  it('should throw error on empty array without initial value', () => {
    expect(() => {
      [].reduce(() => {});
    }).toThrow(TypeError);
  });
});
