function insetSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i;
    for (; j > 0; j--) {
      if (key >= arr[j - 1]) {
        break;
      }
      arr[j] = arr[j - 1];
    }
    arr[j] = key;
  }
}
const arr2 = [9, 1, 5, 8, 3, 7, 4, 6, 2];
insetSort(arr2);
console.log(arr2);
