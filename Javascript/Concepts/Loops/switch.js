function getDayName(day) {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Invalid Day";
  }
}

console.log(getDayName(1));
console.log(getDayName(3));
console.log(getDayName(5));
console.log(getDayName(8));
