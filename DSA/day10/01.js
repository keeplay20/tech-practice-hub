// Accept size n from user and create an n size array then take n inputs into it and finally print the sum & average of all elements.

let size = Number(prompt("Enter size of array : "));
let sum = 0;
let avg = 0;
for (let i = 1; i <= size; i++) {
  let arr = Number(prompt("Enter numbers in array : "));
  console.log(arr);
  sum = sum + arr;
  avg = sum / size;
}

console.log(`The sum of all elements is ${sum} and the average is ${avg}`);
