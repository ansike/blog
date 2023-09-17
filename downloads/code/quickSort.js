const arr = [8, 2, 1, 56, 2, 3];
const quickSort = (arr) => {
  const deal = (left, right) => {
    if (left >= right) return;
    let i = left;
    let j = right;
    let idx = left;
    let val = arr[idx];
    while (i < j) {
      while (i < j && arr[j] > val) j--;
      arr[idx] = arr[j];
      idx = j;
      while (i < j && arr[i] <= val) i++;
      arr[idx] = arr[i];
      idx = i;
    }
    arr[i] = val;
    deal(left, i - 1);
    deal(i + 1, right);
  };
  deal(0, arr.length - 1);
  return arr;
};
console.log(quickSort(arr));
