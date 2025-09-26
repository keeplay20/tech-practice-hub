// Question 22 using Switch (Check Consonant or Vowel using Switch)

let char = prompt("Enter character : ");

switch (char) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("Its a vowel");
    break;
  default:
    console.log("Its a consonant");
    break;
}
