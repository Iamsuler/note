// 最大子数组

function maxSumSubArray(nums: number[]): number {
  const len = nums.length;
  const dp = new Array(len).fill(0);
  dp[0] = nums[0];

  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }

  return Math.max(...dp);
}

console.log(maxSumSubArray([-3, 1, 3, -1, 2, -4, 2]));
