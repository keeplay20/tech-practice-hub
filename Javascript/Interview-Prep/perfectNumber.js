function isGivenNumberPerfect(num) {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num ? true : false;
}

console.log(isGivenNumberPerfect(6));
console.log(isGivenNumberPerfect(28));
console.log(isGivenNumberPerfect(496));
console.log(isGivenNumberPerfect(8128));
console.log(isGivenNumberPerfect(128));
