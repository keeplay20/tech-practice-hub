// Sum up to n terms.

let num = Number(prompt("Enter number : "));

let sum = 0;
for (let i = 1; i <= num; i++) {
  sum = sum + i;
}
console.log(`The sum of all the numbers is : ${sum}`);
