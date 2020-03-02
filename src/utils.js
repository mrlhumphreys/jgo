/**
 * Remove undefined and null values from array.
 * @param {Object[]} array - The array.
 * @return {Object[]}
 */
export const compact = function(array) {
  return array.filter(function(e) {
    return typeof e !== 'undefined' && e !== null;
  });
};

/**
 * Is the object not undefined and not null?
 * @param {Object} e - The object.
 * @return {boolean}
 */
export const exists = function(e) {
  return typeof e !== 'undefined' && e !== null;
};

/**
 * Flatten a multidimensional array.
 * @param {Object[]} array - The array.
 * @param {number} [depth=1] - How deep to flatten. 
 * @return {Object[]}
 */
export const flat = function(array, depth = 1) {
  return array.reduce(function (element, toFlatten) {
    return element.concat((Array.isArray(toFlatten) && (depth>1)) ? flat(toFlatten, depth-1) : toFlatten);
  }, []);
};

/**
 * Find the maximum value of an array of numbers.
 * Returns null if empty.
 * @param {number[]} array - The array.
 * @return {(number|null)} 
 */
export const max = function(array) {
  let result = Math.max(...array);
  if (result === -Infinity) {
    return null;
  } else {
    return result;
  }
};

/**
 * Find the maximum element by a specified definition.
 * @param {Object[]} array - The array.
 * @param {Function} callback - The transformation function applied to each element that returns the desired value.
 * @return {Object}
 */
export const maxBy = function(array, callback) {
  let elements = array.map(callback);
  let result = Math.max(...elements);
  let index = elements.indexOf(result);
  return array[index]; 
};

/**
 * Find the minimum value of an array of numbers.
 * Returns null if empty.
 * @param {number[]} array - The array.
 * @return {(number|null)} 
 */
export const min = function(array) {
  let result = Math.min(...array);
  if (result === Infinity) {
    return null;
  } else {
    return result;
  }
};

/**
 * Remove elements that satisfy the filter function.
 * @param {Object[]} array - The array.
 * @param {Function} callback - The filter function.
 * @return {Object[]}
 */
export const reject = function(array, callback) {
  return array.filter(function(e) {
    return !callback(e);
  });
};

/**
 * Sum all elements in the array.
 * @param {Object[]} array - The array.
 * @param {Function} callback - The transformation function applied to each element before summing
 * @return {number}
 */
export const sum = function(array, callback) {
  if (array.length === 0) {
    return 0;
  }
  return array.map(callback).reduce(function(memo, n) {
    if (memo === undefined) { 
      memo = 0; 
    }
    memo += n;
    return memo;
  });
};

/**
 * Remove non-unique elements from the array.
 * @param {Object[]} array - The array.
 * @return {Object[]}
 */
export const uniq = function(array) {
  return array.filter(function(e, i, a) {
    return a.indexOf(e) === i;
  });
};
