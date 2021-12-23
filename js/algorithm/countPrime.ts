function isPrime(n: number): boolean {
  for (let i = 2; i * i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function countPrime(n: number): number {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }

  return count;
}

console.log(countPrime(10));
