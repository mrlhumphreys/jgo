const sum = function(array, callback) {
  return array.map(callback).reduce(function(memo, n) {
    if (memo === undefined) { 
      memo = 0; 
    }
    memo += n;
    return memo;
  });
};

export default sum;
