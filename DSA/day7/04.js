// Inverted Right Triangle Pattern

// * * * * *
// * * * *
// * * *
// * *
// *

let n = Number(prompt("Enter the number of rows: "));

for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= n - i + 1; j++) {
    row += "* ";
  }
  console.log(row.trim());
  row = "";
}
