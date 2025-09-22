// Accept name and age from the user. Check if the user is a valid voter or not. (Valid - Hello Shery, You are a valid voter. Invalid - Sorry Shery, you can't cast the vote. Part 2 - Print after how many years the user will be eligible)

let name = prompt("Enter name of user : ");
let age = Number(prompt("Enter age of user : "));

let ageRem = 18 - age;

if (age >= 18) {
  console.log(`Valid - Hello ${name}, You are a valid voter`);
} else {
  console.log(
    `Invalid - Sorry ${name}, You can't cast the vote. \nYou can cast vote after ${ageRem} years`
  );
}
