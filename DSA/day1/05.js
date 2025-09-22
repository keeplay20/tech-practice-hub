// Increment and Decrement

// Problem Statement 1
/* 
int i = 11;
		
i = i++ + ++i;

*/

let i = 11;
i = i++ + ++i;

console.log(i);

// Answer is 24

// Problem statement 2
//  int a=11, b=22, c;

//         c = a + b + a++ + b++ + ++a + ++b;

let a = 11;
let b = 22;
let c;

c = a + b + a++ + b++ + ++a + ++b;
//  Answer is 103

//   Problem 3
// int i=0;

//         i = i++ - --i + ++i - i--;

let m = 0;
m = m++ - --m + ++m - m--;
//  = 0 - 0 + 1 - 1
//  Answer is  0

//  Problem 4
// int i=1, j=2, k=3;

// int m = i-- - j-- - k--;

let t = 1;
let j = 2;
let k = 3;
let g;

g = i-- - j-- - k--;
//           = 1 - 2 - 3
//          Answer is -4
