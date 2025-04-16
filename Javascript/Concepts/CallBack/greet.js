function greetUser(name, callback) {
  console.log("Hello, " + name + "!");
  callback(name);
}

// Define Callback
function sayHello(name) {
  console.log("Hello again, " + name + "!");
  console.log("Welcome to the callback function demonstration.");
}

// Call the function with a callback
greetUser("Alice", sayHello);
