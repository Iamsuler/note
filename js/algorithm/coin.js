var coinChange = function (coins, amount) {
  const dp = function (n) {
    if (n === 0) return 0;
    if (n < 0) return -1;
    let res = Number.MAX_SAFE_INTEGER;
    for (let coin of coins) {
      if (n - coin === 0) {
        res = 1;
        break;
      } else if (n - coin < 0) {
        continue;
      }
      let sub = dp(n - coin);
      res = Math.min(res, 1 + sub);
    }

    return res !== Number.MAX_SAFE_INTEGER ? res : -1;
  };

  return dp(amount);
};

const coins = [1, 2, 5];
console.log(coinChange(coins, 11));
