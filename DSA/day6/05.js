// Project - Guess Game (using do while)

let comp = Math.floor(Math.random() * 100 + 1);

let continuePlaying = true;

let user;
do {
  user = Number(prompt("Guess number : "));
  if (comp === user) {
    console.log("The guessed number is right");
    continuePlaying = false;
  } else if (comp > user) {
    console.log("Your guess is lower");
  } else {
    console.log("Your guess is higher");
  }
} while (continuePlaying);
