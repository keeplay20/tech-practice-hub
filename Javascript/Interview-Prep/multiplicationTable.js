function showMultiplicationTable(tableOfNumber, tableLength) {
  for (let i = 1; i <= tableLength; i++) {
    console.log(`${tableOfNumber} * ${i} = ${tableOfNumber * i}`);
  }
}

showMultiplicationTable(11, 10);
