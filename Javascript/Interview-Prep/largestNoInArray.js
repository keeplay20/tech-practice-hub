function getLargestNumberFromArr(arr) {
  if (arr.length === 0) {
    return "Array is empty";
  }
  let max = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" || isNaN(arr[i])) {
      throw new Error("Array is not a number");
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(getLargestNumberFromArr([11, 2]));
console.log(getLargestNumberFromArr([11]));
console.log(getLargestNumberFromArr([]));
console.log(getLargestNumberFromArr([11, 2, 323, 24, 50]));
console.log(getLargestNumberFromArr([1, 2, 3, 4, 5, 6]));
console.log(getLargestNumberFromArr([11, 2, ""]));
