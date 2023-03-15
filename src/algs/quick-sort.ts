/* eslint-disable no-continue */

export function qsRecursive(arr: number[]): number[] {
  if (arr.length < 2) {
    return arr;
  }

  const midIdx = Math.floor((0 + arr.length) / 2);
  const lt = arr.filter((el) => el < arr[midIdx]);
  const gt = arr.filter((el) => el > arr[midIdx]);
  const leftoverEquals = arr.filter((el, idx) => el === arr[midIdx] && idx !== midIdx);

  return [...qsRecursive(lt), arr[midIdx], ...leftoverEquals, ...qsRecursive(gt)];
}

export function qsHeap(arr: number[]): number[] {
  const heap: number[][] = [];
  const sorted: number[] = [];

  heap.push(arr);

  while (heap.length > 0) {
    const currArr = heap.pop() as number[];

    if (currArr.length < 2) {
      sorted.push(currArr[0]);
      continue;
    }

    const midIdx = Math.floor((0 + currArr.length) / 2);
    const lt = currArr.filter((el) => el < currArr[midIdx]);
    const leftoverEquals = currArr.filter((el, idx) => el === currArr[midIdx] && idx !== midIdx);
    const gt = currArr.filter((el) => el > currArr[midIdx]);

    if (gt.length > 0) heap.push(gt);
    heap.push([currArr[midIdx]]);
    if (leftoverEquals.length > 0) heap.push(leftoverEquals);
    if (lt.length > 0) heap.push(lt);
  }

  return sorted;
}

// O(3n * log(n)) = O(n * log(n))
export function useQS() {
  console.dir(qsRecursive([17, 3, 2, 6, 12, 2, 5, 10, 1, 2, 7, 10, 7, 4, 9, 8]));
  console.dir(qsHeap([17, 3, 2, 6, 12, 2, 5, 10, 1, 2, 7, 10, 7, 4, 9, 8]));
}
