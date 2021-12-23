// 输入一个整数数组nums和一个整数k,算出nums中一共几个和为k的子数组
// 举例nums = [1, 1, 1, 2] target = 2  => 3 // [1,1],[1,1],[2]

function subArraySum(nums: number[], target: number): number {
  const len = nums.length;
  let res = 0;

  // 构造前缀和
  const preSum = new Array(len + 1).fill(0);
  for (let i = 0; i < len; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }

  // 穷举所有子数组
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      if (preSum[i] - preSum[j] === target) {
        res++;
      }
    }
  }
  return res;
}

console.log(subArraySum([1, 1, 1, 2], 2));
