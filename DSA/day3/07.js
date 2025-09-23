// Print the sum of all even & odd numbers in a range separately.

let num = Number(prompt("Enter number : "));

let even = 0;
let odd = 0;
for (let i = 1; i <= num; i++) {
  if (i % 2 === 0) {
    even = even + i;
  } else {
    odd = odd + i;
  }
}
console.log(
  `The sum of even number is ${even} \nThe sum of odd numbers is ${odd}`
);
