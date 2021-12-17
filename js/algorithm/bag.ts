function maxBag(w: number, n: number, wt: number[], val: number[]): number {
  let dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(w + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= w; j++) {
      if (j - wt[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - wt[i - 1]] + val[i - 1]
        );
      }
    }
  }
  return dp[n][w];
}

console.log(maxBag(4, 3, [2, 1, 3], [4, 2, 3]));
