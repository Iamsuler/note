function longestCommonSubsequence(text1: string, text2: string): number {
  let len1 = text1.length;
  let len2 = text2.length;
  if (len1 === 0 || len2 === 0) return 0;
  let dp = [];
  for (let i = 0; i <= len2; i++) {
    dp.push(new Array(len1 + 1).fill(0));
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (text2[i - 1] === text1[j - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(dp);
  return dp[len2][len1];
}

console.log(longestCommonSubsequence("babcde", "ace"));
