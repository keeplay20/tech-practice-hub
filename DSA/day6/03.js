// Print Weekday using Switch

let day = Number(prompt("Enter day : "));

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Its a weekday");
    break;
  case 6:
  case 7:
    console.log("Its not a weekday");
    break;
  default:
    console.log("Enter valid day");
}
