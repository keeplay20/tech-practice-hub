function isLeapYear(year) {
  if (year < 0) {
    return "Invalid Year";
  }
  return year % 4 === 0;
}

console.log(isLeapYear(2026)); // No Leap Year
console.log(isLeapYear(2024)); // Leap Year
console.log(isLeapYear(-2024)); // Invalid Year
