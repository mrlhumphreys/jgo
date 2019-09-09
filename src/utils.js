export const compact = function(array) {
  return array.filter(function(e) {
    return typeof e !== 'undefined' && e !== null;
  });
};

export const exists = function(e) {
  return typeof e !== 'undefined' && e !== null;
};

export const flat = function(array, depth = 1) {
  return array.reduce(function (element, toFlatten) {
    return element.concat((Array.isArray(toFlatten) && (depth>1)) ? flat(toFlatten, depth-1) : toFlatten);
  }, []);
};

export const max = function(array) {
  let result = Math.max(...array);
  if (result === -Infinity) {
    return null;
  } else {
    return result;
  }
};

export const maxBy = function(array, callback) {
  let elements = array.map(callback);
  let result = Math.max(...elements);
  let index = elements.indexOf(result);
  return array[index]; 
};

export const min = function(array) {
  let result = Math.min(...array);
  if (result === Infinity) {
    return null;
  } else {
    return result;
  }
};

export const reject = function(array, callback) {
  return array.filter(function(e) {
    return !callback(e);
  });
};

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

export const uniq = function(array) {
  return array.filter(function(e, i, a) {
    return a.indexOf(e) === i;
  });
};
