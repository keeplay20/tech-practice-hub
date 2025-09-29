// Right Triangle - Number Pattern
// 1
// 2 3
// 4 5 6
// 7 8 9 10

let n = Number(prompt("Enter the number of rows: "));
let num = 0;

for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    num += 1;
    row += num + " ";
  }
  console.log(row.trim());
}
