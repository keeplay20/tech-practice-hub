// Right Triangle - Alphabet Pattern

// A
// B C
// D E F
// G H I J

let n = Number(prompt("Enter the number of rows: "));
let alphabet = "A";

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    row += alphabet + " ";
    alphabet = String.fromCharCode(alphabet.charCodeAt(0) + 1);
  }
  console.log(row.trim());
  row = "";
  alphabet = "A";
}
