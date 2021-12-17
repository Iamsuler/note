// function quickSort(arr: number[]): number[] {
//   if (arr.length <= 1) return arr;

//   const pivotIndex = Math.floor(arr.length / 2);
//   const pivot = arr[pivotIndex];
//   const left = [];
//   const right = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (i === pivotIndex) continue;
//     const cur = arr[i];
//     if (cur < pivot) {
//       left.push(cur);
//     } else {
//       right.push(cur);
//     }
//   }

//   return [...quickSort(left), pivot, ...quickSort(right)];
// }
function swap(arr: number[], low: number, high: number) {
  let temp = arr[low];
  arr[low] = arr[high];
  arr[high] = temp;
}
function partition(arr: number[], low: number, high: number): number {
  // 三数取中
  let mid = low + Math.floor((high - low) / 2);
  if (arr[low] > arr[high]) swap(arr, low, high);
  if (arr[mid] > arr[high]) swap(arr, mid, high);
  if (arr[mid] > arr[low]) swap(arr, low, mid);

  let pivot = arr[low];
  let begin = low;
  let end = high;

  while (low < high) {
    while (low < high && arr[high] >= pivot) {
      high--;
    }
    arr[low] = arr[high];

    while (low < high && arr[low] <= pivot) {
      low++;
    }
    arr[high] = arr[low];
  }

  arr[low] = pivot;

  return low;
}
function quickSort(arr: number[], low: number, high: number) {
  if (low < high) {
    let pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

// 生成一个1-count的随机数组
let createTestArray = (count: number) => {
  let temArray = new Array(count).fill(0).map((_, i) => i);
  let i = temArray.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [temArray[j], temArray[i]] = [temArray[i], temArray[j]];
  }
  return temArray;
};
const count = 100000;
const arr = createTestArray(count);
console.time("quickSort");
quickSort(arr, 0, count - 1);
console.timeEnd("quickSort");
