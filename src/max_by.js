const maxBy = function(array, callback) {
  let elements = array.map(callback);
  let result = Math.max(...elements);
  let index = elements.indexOf(result);
  return array[index]; 
};

export default maxBy;
