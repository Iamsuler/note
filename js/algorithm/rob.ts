// 线性排列情况
// 给定非负整数数组nums，每个元素代表房子中的现金金额
// 可以从房子中取钱，但有约束条件，相邻房子的前不能同时被取出。
// 举例：[2, 1, 7, 9, 3, 1] => 12
// dp定义 dp[i]为从i~len+1间房子能取到的最多现金

function rob(nums: number[]): number {
  const len = nums.length;
  const dp = new Array(len + 2).fill(0);

  for (let i = len - 1; i >= 0; i--) {
    dp[i] = Math.max(
      dp[i + 1], // 不取当前房子，则等于前一间房子的值
      dp[i + 2] + nums[i] // 取，则等于前两间房子加上当前价值
    );
  }

  return dp[0];
}

console.log(rob([2, 1, 7, 9, 3, 1]));
