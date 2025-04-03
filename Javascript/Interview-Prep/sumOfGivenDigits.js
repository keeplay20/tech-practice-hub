function getSumOfGivenDigits(num) {
  if (num < 1) {
    return "Number should be greater than 0";
  } else {
    const stringInputNo = num.toString();
    const digitsArray = stringInputNo.split("");
    let sum = 0;
    digitsArray.forEach((digit) => {
      sum = sum + Number(digit);
    });
    return sum;
  }
}

console.log("Sum of input digits is : ", getSumOfGivenDigits(1234567890));
console.log("Sum of input digits is : ", getSumOfGivenDigits(23104));
console.log("Sum of input digits is : ", getSumOfGivenDigits(95733));
