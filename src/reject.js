const reject = function(array, callback) {
  return array.filter(function(e) {
    return !callback(e);
  });
};

export default reject;
