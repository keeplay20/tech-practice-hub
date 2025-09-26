// Print \hello\" until user gives wrong input using do while"

let isCorrectInput = true;
do {
  let text = prompt("Enter word 'hello' : ");
  if (text === "hello") {
    console.log("Hello World");
    isCorrectInput = true;
  } else {
    isCorrectInput = false;
    console.log("Wrong input!!");
  }
} while (isCorrectInput);
