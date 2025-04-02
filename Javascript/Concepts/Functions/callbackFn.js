const knowCallBackFn = (number, callBackFn) => {
  console.log(`Number is ${number}`);
  callBackFn();
};

const cb = () => {
  console.log("This is a callback function");
};

knowCallBackFn(12, cb);
