// 素数之积

// RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数分解的困难度，数据越大，安全系数越高，给定一个32位正整数， 请对其进行因数分解，找出是哪两个素数的乘积。

// 输入描述:

// 一个正整数num
// 0 < num <= 2147483647
// 输出描述:

// 如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1 -1

// 示例1

// 输入
// 15
// 输出

// 3 5
// 说明

// 因数分解后，找到两个素数3和5，使得3*5=15，按从小到大排列后，输出3 5
function is_prime(num: number): boolean {
  if (num <= 1) {
    return false;
  }
  const sqrt = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true
}
function nowcoder_prime(num: number): [number, number] {
  let a = -1;
  let b = -1;
  const sqrt = Math.floor(Math.sqrt(num));

  for (let i = 2; i <= sqrt; i++) {
    if (is_prime(i) && num % i === 0) {
      let cur = num / i;
      if (is_prime(cur)) {
        a = i;
        b = cur;
        break;
      }
    }
  }

  return [a, b];
}

console.log(nowcoder_prime(15));
console.log(nowcoder_prime(27));