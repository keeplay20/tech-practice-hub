function isStringInAlphabeticalOrder(str) {
  const lowerStr = str.toLowerCase();

  for (let i = 1; i < lowerStr.length; i++) {
    if (lowerStr[i] < lowerStr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Example usage:
console.log(isStringInAlphabeticalOrder("STbcde")); // false
console.log(isStringInAlphabeticalOrder("abcde")); // true
console.log(isStringInAlphabeticalOrder("aBcde")); // true
console.log(isStringInAlphabeticalOrder("abcdeF")); // true
console.log(isStringInAlphabeticalOrder("abcdefg")); // true
console.log(isStringInAlphabeticalOrder("aBcdgef")); // false
