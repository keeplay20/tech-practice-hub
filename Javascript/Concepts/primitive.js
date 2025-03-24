// Number
let a = 10;
let b = 20;
console.log(`Number : ${a + b}`);

// String
let greeting = "Hello";
console.log("String :", greeting.toUpperCase());

// Boolean
let isLoggedIn = false;
console.log("Boolean : ", !isLoggedIn);

// Null & Undefined
let user = null;
let count;
console.log("Null Type : ", typeof user, "Undefined Type : ", typeof count);

// Symbol
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false

// BigInt
let big1 = 123456789012345678901234567890n;
let big2 = 100000000000000000000n;
console.log(big1 + big2);
