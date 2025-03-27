function checkNumber(num) {
  if (num > 0) {
    return `${num} is Positive`;
  } else if (num < 0) {
    return `${num} is Negative`;
  } else {
    return `${num} is Zero`;
  }
}

console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0));
