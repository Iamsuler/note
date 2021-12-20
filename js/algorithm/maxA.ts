// N次操作最多有几个A
// 四个键 A  C+A  C+C C+V
// n = 3 => 3   n = 7 => 9

function maxA(count: number): number {
  function dp(n: number, num: number, copy: number): number {
    // base case
    if (n <= 0) {
      return num;
    }

    return Math.max(
      dp(n - 1, num + 1, copy), // A
      dp(n - 1, num + copy, copy), // C+V
      dp(n - 2, num, num)
    );
  }

  return dp(count, 0, 0);
}

console.log(maxA(7));
