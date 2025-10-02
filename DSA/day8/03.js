// Restaurant Bill

do {
  let dish = prompt("Enter dish name : ");
  let sum = 0;
  switch (dish) {
    case "pizza":
      console.log("Pizza is 100");
      sum = sum + 100;
      break;
    case "burger":
      console.log("Burger is 50");
      sum = sum + 50;
      break;
    case "coke":
      console.log("Coke is 20");
      sum = sum + 20;
      break;
    default:
      console.log("Invalid dish");
      sum = sum + 0;
      break;
  }
  console.log(`The total bill is ${sum}`);
} while (true);
