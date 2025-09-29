// Mirrored Right Triangle Pattern

//     *
//    **
//   ***
//  ****
// *****

let n = Number(prompt("Enter the number of rows: "));
for (let i = 1; i <= n; i++) {
  let row = "";

  // Step 1: Spaces
  for (let s = 1; s <= n - i; s++) {
    row += " ";
  }

  // Step 2: Stars
  for (let j = 1; j <= i; j++) {
    row += "*";
  }

  console.log(row);
}
