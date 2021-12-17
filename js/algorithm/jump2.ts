function jump(nums: number[]): number {
  let len = nums.length;
  let memo = new Array(len).fill(len);
  function dp(nums: number[], p: number): number {
    if (p >= len - 1) return 0;
    if (memo[p] !== len) return memo[p];

    let step = nums[p];

    for (let i = 1; i <= step; i++) {
      let sub = dp(nums, p + i);
      memo[p] = Math.min(sub + 1, memo[p]);
    }

    return memo[p];
  }

  return dp(nums, 0);
}
let step2 = jump([1, 2, 3]);
console.log(step2);
