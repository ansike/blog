class MaxHeap {
    private heap: number[] = [];
    constructor() { }
    insert(val: number) {
        this.heap.push(val);
        this.shiftUp(this.heap.length - 1);
    }
    deleteMax() {
        if (this.heap.length <= 1) this.heap.pop();
        this.heap[0] = this.heap.pop()!;
        this.shiftDown(0);
    }
    shiftUp(idx: number) {
        if (idx === 0) return 0;
        const parentIdx = Math.floor((idx - 1) / 2)
        if (this.heap[parentIdx] < this.heap[idx]) {
            this.swap(parentIdx, idx);
            this.shiftUp(parentIdx);
        }
    }
    shiftDown(idx: number) {
        const lIdx = idx * 2 + 1;
        const rIdx = idx * 2 + 2;
        let maxIdx = idx;
        if (lIdx && lIdx < this.heap.length && this.heap[lIdx] > this.heap[maxIdx]) {
            maxIdx = lIdx;
        }
        if (rIdx && rIdx < this.heap.length && this.heap[rIdx] > this.heap[maxIdx]) {
            maxIdx = rIdx;
        }
        if(maxIdx !== idx){
            this.swap(maxIdx, idx);
            this.shiftDown(maxIdx);
        }
    }
    swap(idx1: number, idx2: number) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }
}

const heap = new MaxHeap();
const a = [1, 2, 31, 22, 11, 21];
for (const it of a) {
    heap.insert(it);
}
console.log(heap);
heap.deleteMax();
console.log(heap);