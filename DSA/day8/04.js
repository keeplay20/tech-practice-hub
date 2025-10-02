// V Pattern

let n = Number(prompt("Enter number : "));

for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= n * 2; j++) {
    if (i === j || i + j === n * 2) {
      row = row + "*";
    } else {
      row = row + " ";
    }
  }
  console.log(row);
}
