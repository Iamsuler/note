// function superEggDrop(k: number, n: number): number {
//   let memo: Record<string, number> = {};
//   function dp(k: number, n: number) {
//     if (k === 1) return n;
//     if (n === 0) return 0;
//     let key = `${k}${n}`;
//     if (memo[key]) return memo[key];
//     let res = Number.MAX_SAFE_INTEGER;
//     for (let i = 1; i <= n; i++) {
//       res = Math.min(
//         res,
//         Math.max(
//           dp(k - 1, i - 1), // 碎了
//           dp(k, n - i) //没碎
//         ) + 1
//       );
//     }
//     memo[key] = res;
//     return res;
//   }

//   return dp(k, n);
// }

function superEggDrop(k: number, n: number): number {
  let memo: Record<string, number> = {};
  let dp = Array.from(new Array(k + 1), () => new Array(n + 1).fill(0));
  // 次数
  let m = 0;

  while (dp[k][m] < n) {
    m++;
    for (let i = 1; i <= k; i++) {
      dp[i][m] = dp[i][m - 1] + dp[i - 1][m - 1] + 1;
    }
  }

  return m;
}

console.time("egg");
superEggDrop(2, 6);
console.timeEnd("egg");
