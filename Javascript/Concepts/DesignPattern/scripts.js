let bankDetails = (function () {
  let bankBalance = 10;

  function checkBalance() {
    return bankBalance;
  }

  function addBalance(value) {
    bankBalance = bankBalance + value;
  }

  function withdrawBalance(value) {
    bankBalance = bankBalance - value;
  }

  return { check: checkBalance, set: addBalance, draw: withdrawBalance };
})();
