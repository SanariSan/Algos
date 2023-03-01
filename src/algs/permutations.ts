function getPermutations<T>(inputArrayGlobal: readonly T[]) {
  const out: Array<Readonly<T[]>> = [];

  function recursion(inputArrayLocal: readonly T[], accumulator: readonly T[] = []) {
    if (accumulator.length === inputArrayGlobal.length) {
      out.push(accumulator);
      return;
    }

    inputArrayLocal.forEach((el, i) => {
      const inputArrayLocalShallow = [...inputArrayLocal];
      inputArrayLocalShallow.splice(i, 1);

      recursion(inputArrayLocalShallow, [...accumulator, el]);
    });
  }

  recursion(inputArrayGlobal);

  return out;
}

export { getPermutations };

export function howTo() {
  console.log(getPermutations([1, 2, 3, 4]));
}
