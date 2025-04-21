function isStringAnagram(str1, str2) {
  str1 = str1.replace(/[^a-zA-Z]/g, "").toLowerCase();
  str2 = str2.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (str1.length !== str2.length) {
    return false;
  }
  const charCount = {};
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }
  return true;
}

console.log(isStringAnagram("listen", "silent")); // true
