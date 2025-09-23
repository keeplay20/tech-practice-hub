// Accept an English alphabet from user and check if it is a consonant or a vowel.

let alpha = prompt("Enter alphabet : ");
alpha = alpha.toLowerCase();
if (alpha.length > 1) {
  console.log("Enter only 1 alphabet");
} else if (
  alpha === "a" ||
  alpha === "e" ||
  alpha === "i" ||
  alpha === "o" ||
  alpha === "u"
) {
  console.log("The alphabet is vowel");
} else {
  console.log("The alphabet is consonant");
}
