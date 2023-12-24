const quickSort = (arr: number[]) => {
    const deal = (arr: number[], left: number, right: number) => {
        if(left>=right)return arr;
        let i = left;
        let j = right;
        let temp = arr[left];
        while(i<j){
            while(i<j && arr[j]<=temp) j--;
            arr[i] = arr[j];
            while(i<j && arr[i]>=temp) i++;
            arr[j] = arr[i];
        }
        arr[i] = temp;
        deal(arr, left, i-1);
        deal(arr, i+1, right);
        return arr;
    }
    return deal(arr, 0, arr.length - 1)
}

console.log(quickSort([12, 11, 2, 13, 3]))