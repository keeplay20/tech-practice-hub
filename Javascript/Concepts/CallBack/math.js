function executorFunction(num1, num2, operationCallBack) {
  const result = operationCallBack(num1, num2);
  console.log(`The result of the operation is: ${result}`);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

console.log(executorFunction(10, 5, add)); // The result of the operation is: 15
console.log(executorFunction(10, 5, subtract)); // The result of the operation is: 5
console.log(executorFunction(10, 5, multiply)); // The result of the operation is: 50
console.log(executorFunction(10, 5, divide)); // The result of the operation is: 2
