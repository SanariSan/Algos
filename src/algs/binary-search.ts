export function binarySearch(arr: number[], target: number) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const mid = Math.floor((max + min) / 2);
    if (mid < target) {
      min = mid + 1;
    } else if (mid > target) {
      max = mid - 1;
    } else {
      return true;
    }
  }

  return false;
}

export function useBinarySearch() {
  console.log(binarySearch([1, 2, 3, 4, 5, 6], 4));
}
