var coinChange = function (coins, amount) {
  let memo = new Map();
  const dp = function (n) {
    if (memo.has(n)) return memo.get(n);

    // base case
    if (n === 0) return 0;
    if (n < 0) return -1;
    let res = amount + 1;

    for (let coin of coins) {
      let sub = dp(n - coin);
      if (sub === -1) continue;
      res = Math.min(res, 1 + sub);
    }

    memo.set(n, res !== amount + 1 ? res : -1);
    return memo.get(n);
  };

  return dp(amount);
};

const coins = [1, 2, 5];
console.log(coinChange(coins, 11));
