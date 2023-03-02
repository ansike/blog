/*
 * @Description: 快排
 */

function quickSort(arr) {
  const deal = (arr, left, right) => {
    if (left >= right) return;
    // 优化三数取中
    // let m = left + (right - left) / 2;
    // if (arr[left] > arr[right]) {
    //   [arr[left], arr[right]] = [arr[right], arr[left]];
    // }
    // if (arr[left] > arr[m]) {
    //   [arr[left], arr[m]] = [arr[m], arr[left]];
    // }
    // if (arr[m] > arr[left]) {
    //   [arr[left], arr[m]] = [arr[m], arr[left]];
    // }
    let i = left;
    let j = right;
    let temp = arr[i];
    while (i < j) {
      while (i < j && arr[j] >= temp) j--;
      arr[i] = arr[j];
      while (i < j && arr[i] <= temp) i++;
      arr[j] = arr[i];
    }
    arr[i] = temp;
    deal(arr, left, i - 1);
    deal(arr, i + 1, right);
  };
  deal(arr, 0, arr.length - 1);
  return arr;
}
console.time()
console.log(quickSort([1, -1, 2, 3, 2, 1, 1, 2, 0, 4]));
console.timeEnd()
