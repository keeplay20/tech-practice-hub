function getCharacterCount(str) {
  const result = {};
  const strLower = str.toLowerCase();
  for (let i = 0; i < strLower.length; i++) {
    if (!result[str[i]]) {
      result[str[i]] = 0;
    }
    result[str[i]]++;
  }
  return result;
}

console.log(getCharacterCount("hello world"));
