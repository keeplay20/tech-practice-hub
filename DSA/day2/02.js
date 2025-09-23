//  Shop discount
// 0-5k - 0% discount
// 5-10K - 10% discount
// 10k-15k - 15% discount
// 15k + - 20% discount
// What is the payable amount

let totalAmount = Number(prompt("Enter total amount : "));
let payableAmt = totalAmount;
let discount = 0;
if (totalAmount >= 15000) {
  payableAmt = totalAmount - (20 / 100) * totalAmount;
  discount = 20;
} else if (totalAmount >= 10000) {
  payableAmt = totalAmount - (15 / 100) * totalAmount;
  discount = 15;
} else if (totalAmount >= 5000) {
  payableAmt = totalAmount - (10 / 100) * totalAmount;
  discount = 10;
}
console.log(
  `Applied ${discount}% discount, Please pay ${payableAmt} as final amount.`
);
