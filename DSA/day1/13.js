// Accept the gender from the user as char and print the respective greeting message (Ex - Good Morning Sir (on the basis of gender))

let gender = prompt("Enter gender either M or F : ");

if (gender === "m" || gender === "M") {
  console.log(`Good Morning Sir`);
} else if (gender === "f" || gender === "F") {
  console.log(`Good Morning Ma'am`);
} else {
  console.log("Invalid Input");
}
