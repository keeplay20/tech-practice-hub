const isThisWordPalindrome = (word) => {
  let newWord = word.toLowerCase();
  let reverseWord = "";
  for (let i = newWord.length - 1; i >= 0; i--) {
    reverseWord = reverseWord + newWord[i];
  }
  return newWord == reverseWord;
};

console.log(isThisWordPalindrome("racecar")); // true
console.log(isThisWordPalindrome("level")); // true
console.log(isThisWordPalindrome("Madam")); // true
console.log(isThisWordPalindrome("hello")); // false
