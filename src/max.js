const max = function(array) {
  let result = Math.max(...array);
  if (result === -Infinity) {
    return null;
  } else {
    return result;
  }
};

export default max;
