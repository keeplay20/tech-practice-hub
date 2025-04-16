function swapNumbers(a, b) {
  console.log("Before Swap", a, b);
  let c = a;
  a = b;
  b = c;
  return [a, b];
}

console.log(swapNumbers(5, 10));
