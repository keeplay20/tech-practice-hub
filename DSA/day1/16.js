// Accept a day number between 1-7 and print the corresponding day name.

let day = Number(prompt("Enter day between 1-7 : "));
if (day === 1) {
  console.log("Its Monday");
} else if (day === 2) {
  console.log("Its Tuesday");
} else if (day === 3) {
  console.log("Its Wednesday");
} else if (day === 4) {
  console.log("Its Thursday");
} else if (day === 5) {
  console.log("Its Friday");
} else if (day === 6) {
  console.log("Its Saturday");
} else if (day === 7) {
  console.log("Its Sunday");
} else {
  console.log("Invalid day entered");
}
