class RangeList {
  // store all the segments
  stack = [];
  /**
 * Adds a range to the list
 * @param {Array<number>} range - Array of two integers that specify
beginning and end of range.
 */
  add(range) {
    this.checkArgv(range);
    const newArr = [];
    const [start, end] = range;
    const len = this.stack.length;
    let i = 0;
    while (i < len && this.stack[i][1] < start) {
      newArr.push(this.stack[i]);
      i++;
    }
    const tempArr = [start, end];
    while (i < len && this.stack[i][0] <= end) {
      tempArr[0] = Math.min(tempArr[0], this.stack[i][0]);
      tempArr[1] = Math.max(tempArr[1], this.stack[i][1]);
      i++;
    }
    newArr.push(tempArr);
    while (i < len && this.stack[i][0] > end) {
      newArr.push(this.stack[i]);
      i++;
    }
    this.stack = newArr;
  }
  /**
 * Removes a range from the list
 * @param {Array<number>} range - Array of two integers that specify
beginning and end of range.
 */
  remove(range) {
    this.checkArgv(range);
    const newArr = [];
    const [start, end] = range;
    this.stack.forEach(([stackStart, stackEnd]) => {
      if (start >= stackEnd || end <= stackStart) {
        newArr.push([stackStart, stackEnd]);
      } else {
        if (start > stackStart) {
          newArr.push([stackStart, start]);
        }
        if (end < stackEnd) {
          // the range number is equal
          if (start === end) {
            newArr.push([end + 1, stackEnd]);
          } else {
            newArr.push([end, stackEnd]);
          }
        }
      }
    });
    this.stack = newArr;
  }
  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const res = this.stack.reduce(
      (prev, cur) => `${prev ? prev + " " : ""}[${cur[0]}, ${cur[1]})`,
      ""
    );
    console.log(res);
  }

  /**
   * check arguments
   */
  checkArgv(range) {
    if (!Array.isArray(range)) throw "the argument [range] must be an array";
    if (range.length !== 2) throw "the argument [range]'s length must be two";
    if (range.some((num) => typeof num !== "number" || num !== num >> 0))
      throw "the argument [range]'s item must be an integer";
    if (range[0] > range[1]) throw "the argument [range]'s range[0]<=range[1]";
  }
}
// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

// Cause there is no remove example, I'm not sure if my examples are ok.
rl.remove([19, 20]);
rl.print();
// [1, 8) [10, 19) [20, 21)
rl.remove([2, 2]);
rl.print();
// [1, 2) [3, 8) [10, 19) [20, 21)
rl.remove([12, 15]);
rl.print();
// [1, 2) [3, 8) [10, 12) [15, 19) [20, 21)
