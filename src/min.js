const min = function(array) {
  let result = Math.min(...array);
  if (result === Infinity) {
    return null;
  } else {
    return result;
  }
};

export default min;
