let person = {
  name: "John",
  age: 30,
};
console.log("The name of the person is :", person.name);

let numbers = [1, 2, 3, 4, 5];
console.log("The first element of the array is :", numbers[0]);
let doubled = numbers.map((num) => num * 2);
console.log("The doubled value is : ", doubled);

// Function
function add(x, y) {
  return x + y;
}
console.log("The addition of these numbers is : ", add(5, 7));

// Date
let today = new Date();
console.log("Todays date is : ", today.toDateString());

// RegExp
let str = "I love JavaScript";
let pattern = /love/;
console.log("Is pattern valid with string ? ", pattern.test(str)); // true
