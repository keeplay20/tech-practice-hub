function getWordCountOfSentence(sentence) {
  const splitWords = sentence.split(" ");

  let wordCount = 0;
  for (let i = 0; i < splitWords.length; i++) {
    if (splitWords[i] !== "") {
      wordCount++;
    }
  }
  return wordCount;
}

console.log(getWordCountOfSentence("Hello! This is a test sentence"));
console.log(getWordCountOfSentence("A smooth dark/light mode toggle"));
console.log(
  getWordCountOfSentence(
    "Would you like to save theme preference using localStorage next so it remembers your theme?"
  )
);
