// Accept the length and width of a rectangle. Calculate & print the area and perimeter.

let length = Number(prompt("Enter length of rectangle : "));
let breadth = Number(prompt("Enter breadth of rectangle : "));

let area = length * breadth;
let perimiter = 2 * (length + breadth);

console.log(
  `Area of rectangle is : ${area} \nPerimeter of rectangle is : ${breadth}`
);
