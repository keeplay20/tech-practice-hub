function showNumPyramid(num) {
  console.log("Number Pyramid:", num);
  for (let i = 1; i <= num; i++) {
    let str = "";

    // Add spaces
    for (let j = 1; j <= num - i; j++) {
      str += " ";
    }

    // Add increasing numbers
    for (let j = 1; j <= i; j++) {
      str += j;
    }

    // Add decreasing numbers
    for (let j = i - 1; j >= 1; j--) {
      str += j;
    }

    console.log(str);
  }
}

console.log(showNumPyramid(5));
