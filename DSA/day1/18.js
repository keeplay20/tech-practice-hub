// Accept a year and check if it a leap year or not (google to find out what's a leap year)

let year = Number(prompt("Enter year : "));

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log("Its a leap year");
} else {
  console.log("Its not a leap year");
}
