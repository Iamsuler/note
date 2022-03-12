// 给出硬币coins，求凑出amount所需的最少硬币

// var coinChange = function (coins, amount) {
//   let memo = new Map();
//   const dp = function (n) {
//     if (memo.has(n)) return memo.get(n);

//     // base case
//     if (n === 0) return 0;
//     if (n < 0) return -1;
//     let res = amount + 1;

//     for (let coin of coins) {
//       let sub = dp(n - coin);
//       if (sub === -1) continue;
//       res = Math.min(res, 1 + sub);
//     }

//     memo.set(n, res !== amount + 1 ? res : -1);
//     return memo.get(n);
//   };

//   return dp(amount);
// };

// dp数组迭代方法
// dp数组定义：当目标金额为i的时候，至少需要dp[i]枚硬币凑出

function coinChange(coins, n) {
  const length = coins.length;
  let dp = new Array(n + 1)
    .fill()
    .map((value, index) => (index === 0 ? 0 : n + 1));

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < length; j++) {
      let coin = coins[j];
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }

  return dp[n] === n + 1 ? -1 : dp[n];
}

const coins = [1, 2, 5];
console.log(coinChange(coins, 11));
