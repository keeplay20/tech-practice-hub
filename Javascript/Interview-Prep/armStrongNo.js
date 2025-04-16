function isArmsStrongNumber(num) {
  let splitNum = num.toString().split("");
  let powerNumber = 0;
  console.log(`Is ${num} an Armstrong Number`);
  for (let i = 0; i < splitNum.length; i++) {
    powerNumber = powerNumber + splitNum[i] ** splitNum.length;
  }
  return powerNumber === num;
}

console.log(isArmsStrongNumber(153)); // true
console.log(isArmsStrongNumber(9474)); // true
console.log(isArmsStrongNumber(9475)); // false
