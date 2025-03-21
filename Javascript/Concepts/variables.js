function testVarVariable() {
  var a = 10;
  console.log("============================\nVar Before if ", a);
  if (true) {
    var a = 20;
    console.log("Var Inside if ", a);
  }
  console.log("Var After if", a, "\n============================");
}

function testLetVariable() {
  let a = 10;
  const b = 20;
  console.log("Let Before if ", a);

  if (true) {
    let a = 20;

    console.log("Let Inside if ", a);
  }
  console.log("Const outside if ", b);
  console.log("Let After if", a, "\n============================");
}

testVarVariable();
testLetVariable();
