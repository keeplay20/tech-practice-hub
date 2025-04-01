function getFactorialNo(num) {
  if (num === 0) {
    return 1;
  } else {
    for (let i = num - 1; i > 1; i--) {
      num = num * i;
    }
    return num;
  }
}

console.log(getFactorialNo(10));
