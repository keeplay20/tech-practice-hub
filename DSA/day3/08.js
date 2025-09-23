//  Print all the factors of a number.

let number = Number(prompt("Enter number : "));

for (let i = 1; i <= number / 2; i++) {
  if (number % i === 0) {
    console.log(i + " ");
  }
}
console.log(number);
