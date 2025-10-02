// Triangle Pattern

let n = Number(prompt("Enter number : "));

for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= n - i; j++) {
    row = row + " ";
  }
  for (let k = 1; k <= 2 * i - 1; k++) {
    row = row + "*";
  }
  console.log(row);
}
