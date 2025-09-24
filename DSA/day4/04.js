// Take a number as input and print its table (Ex: 5 * 1 = 5 ... up to 10 terms)

let number = Number(prompt("Enter number : "));

let i = 1;
let num;
while (i <= 10) {
  num = number * i;
  i++;
  console.log(num);
}
