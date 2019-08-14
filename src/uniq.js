const uniq = function(array) {
  return array.filter(function(e, i, a) {
    return a.indexOf(e) === i;
  });
};

export default uniq;
