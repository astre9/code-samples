
export const toObj = (arr: any) => {
  var result = [];
  var k = 0;
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i].isGood) {
      result[k] = arr[i].content;
      k++;
    }
  }
  return result;
};
