// Print all the factors of a number.

let number = Number(prompt("Enter number : "));

let i = 1;
let factors;
while (i <= number) {
  if (number % i === 0) {
    console.log(i);
  }
  i++;
}
