export function frequencyMap(arr: number[]) {
  const map = new Map<number, number>();

  // eslint-disable-next-line no-restricted-syntax
  for (const element of arr) {
    const hits: number = map.get(element) ?? 0;
    map.set(element, hits + 1);
  }

  return [...map.entries()];

  // eslint-disable-next-line unicorn/no-for-loop
  //   for (let i = 0; i < arr.length; i += 1) {
  //     const el = arr[i];
  //     const hits: number = map.get(el) ?? 0;
  //     map.set(el, hits + 1);
  //   }
}

export function useFrequencyMap() {
  console.log(frequencyMap([1, 2, 1, 1, 3, 2, 4, 4, 5]));
}
