const compact = function(array) {
  return array.filter(function(e) {
    return typeof e !== 'undefined' && e !== null;
  });
};

export default compact;
