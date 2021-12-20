// N次操作最多有几个A
// 四个键 A  C+A  C+C C+V
// n = 3 => 3   n = 7 => 9

function maxA(count: number): number {
  let memo = new Map();
  function dp(n: number, num: number, copy: number): number {
    const key = `${n}-${num}-${copy}`;
    if (memo.has(key)) {
      return memo.get(key);
    }
    // base case
    if (n <= 0) {
      return num;
    }

    const res = Math.max(
      dp(n - 1, num + 1, copy), // A
      dp(n - 1, num + copy, copy), // C+V
      dp(n - 2, num, num) // C+A, C+C
    );

    memo.set(key, res);
    return memo.get(key);
  }

  return dp(count, 0, 0);
}

console.log(maxA(7));
