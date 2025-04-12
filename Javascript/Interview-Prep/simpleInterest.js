function getSimpleInterest(principalAmt, noOfYears, interestRate) {
  if (principalAmt <= 0 || noOfYears <= 0 || interestRate <= 0) {
    return "Invalid input";
  }
  let simpleInterest = 0;
  simpleInterest = (principalAmt * interestRate * noOfYears) / 100;
  return simpleInterest;
}

console.log(getSimpleInterest(1000, -2, 5)); // 100
