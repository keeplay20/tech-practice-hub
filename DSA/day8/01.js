// X Pattern

let n = Number(prompt("Enter number : "));

if (n % 2 === 0) {
  console.log("Enter odd number");
} else {
  for (let i = 1; i <= n; i++) {
    let row = "";
    for (let j = 1; j <= n; j++) {
      if (i === j || i + j === n + 1) {
        row = row + "*";
      } else {
        row = row + " ";
      }
    }
    console.log(row);
  }
}
