function getVowelsAndConsonantsCount(str) {
  const vowels = "aeiouAEIOU";
  let vowelsCount = 0;
  let consonantsCount = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      vowelsCount++;
    } else {
      consonantsCount++;
    }
  }

  return { vowelsCount, consonantsCount };
}

console.log(getVowelsAndConsonantsCount("Hello"));
console.log(getVowelsAndConsonantsCount("12233"));
console.log(getVowelsAndConsonantsCount(""));
console.log(getVowelsAndConsonantsCount("000000000"));
console.log(getVowelsAndConsonantsCount("aeiouAEIOU"));
