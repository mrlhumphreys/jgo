const flat = function(array, depth = 1) {
  return array.reduce(function (element, toFlatten) {
    return element.concat((Array.isArray(toFlatten) && (depth>1)) ? flat(toFlatten, depth-1) : toFlatten);
  }, []);
};

export default flat;
