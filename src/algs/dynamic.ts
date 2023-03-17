/* eslint-disable */

type TDict = { [key: string]: [number, number] };

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

function optimizedItemsSetWithLimitationDynamicSolve({
  dict,
  gradationDict,
}: {
  dict: TDict;
  gradationDict: number[];
}) {
  const dictVals = Object.values(dict);

  const gradationDictReverseHash = gradationDict.reduce((acc, el, idx) => {
    acc[el] = idx;
    return acc;
  }, {});

  const dynamicMatrix = Array.from({ length: dictVals.length }, () =>
    Array.from({ length: gradationDict.length }, () => 0),
  );
  const dynamicMatrixCompositionTracker = Array.from({ length: dictVals.length }, () =>
    Array.from({ length: gradationDict.length }, (): number[] => []),
  );

  // console.log('----');
  // dynamicMatrix.forEach((_) => console.log(_));
  // console.log(gradationDict);
  // console.log(gradationDictReverseHash);
  // console.log('-------------');

  for (let weightIdx = 0; weightIdx < dynamicMatrix.length; weightIdx += 1) {
    // gradation and weight for current element, will be compared with
    const dictWeightBase = dictVals[weightIdx][0];
    const dictGradationBase = dictVals[weightIdx][1];

    for (let gradationIdx = 0; gradationIdx < gradationDict.length; gradationIdx += 1) {
      const gradationCurr = gradationDict[gradationIdx];

      // worst+easiest case, if grade not fit
      if (gradationCurr < dictGradationBase) {
        // then we set 0(== skip bcs filled with 0 already)
        // or take value from prev line(weightIdx - 1) if it's not undefined
        const prevRowValue = dynamicMatrix[weightIdx - 1]?.[gradationIdx];
        if (prevRowValue === undefined) {
          dynamicMatrix[weightIdx][gradationIdx] = 0;
        } else {
          dynamicMatrix[weightIdx][gradationIdx] = prevRowValue;

          // put prev row el idx
          dynamicMatrixCompositionTracker[weightIdx][gradationIdx].push(
            ...dynamicMatrixCompositionTracker[weightIdx - 1][gradationIdx],
          );
        }
      } else if (gradationCurr === dictGradationBase) {
        // here it fits into gradations
        // now we can fit only this element weight or take weight of 1 row above if it has higher value
        const prevRowValue = dynamicMatrix[weightIdx - 1]?.[gradationIdx] ?? 0;

        if (prevRowValue > dictWeightBase) {
          dynamicMatrix[weightIdx][gradationIdx] = prevRowValue;

          // extract idxes from prev row
          dynamicMatrixCompositionTracker[weightIdx][gradationIdx].push(
            ...dynamicMatrixCompositionTracker[weightIdx - 1][gradationIdx],
          );
        } else {
          dynamicMatrix[weightIdx][gradationIdx] = dictWeightBase;

          // put curr el idx
          dynamicMatrixCompositionTracker[weightIdx][gradationIdx].push(weightIdx);
        }
      } else {
        // this case covers situation when there's free gradation left after we took base weight for current cell
        let currBestWeight = dictWeightBase;

        // get gradation idx of prev row value that could fit by using reverse hash
        const leftoverGradationIdx = gradationDictReverseHash[gradationCurr - dictGradationBase];
        const additionalValueThatCouldFit =
          dynamicMatrix[weightIdx - 1]?.[leftoverGradationIdx] ?? 0;
        currBestWeight += additionalValueThatCouldFit;

        const prevRowValue = dynamicMatrix[weightIdx - 1]?.[gradationIdx] ?? 0;
        if (prevRowValue < currBestWeight) {
          dynamicMatrix[weightIdx][gradationIdx] = currBestWeight;

          // extract idxes from prev row's leftover gradation + curr el idx
          dynamicMatrixCompositionTracker[weightIdx][gradationIdx].push(
            ...(dynamicMatrixCompositionTracker[weightIdx - 1]?.[leftoverGradationIdx] ?? []),
            weightIdx,
          );
        } else {
          dynamicMatrix[weightIdx][gradationIdx] = dynamicMatrix[weightIdx - 1][gradationIdx];

          // extract idxes from prev row
          dynamicMatrixCompositionTracker[weightIdx][gradationIdx].push(
            ...dynamicMatrixCompositionTracker[weightIdx - 1][gradationIdx],
          );
        }
      }
    }
  }

  console.log('----');
  dynamicMatrix.forEach((_) => console.log(_));
  console.log('----');
  dynamicMatrixCompositionTracker.forEach((_) => console.log(_));
  console.log('----');

  const endSumm = dynamicMatrix.at(-1)?.at(-1);
  const endElements = dynamicMatrixCompositionTracker.at(-1)?.at(-1);
  const endWeights = endElements?.map((el) => dictVals[el][0]);
  console.log(
    `Optimized total summ is: ${endSumm} | Composed from elements (idxs): ${endElements} | With weights: ${endWeights}`,
  );
}

function longestSubstringDynamicSolve({ target, dict }: { target: string; dict: string[] }) {
  //   a b c d e
  // b 0 0 0 0 0
  // b 0 1 0 0 0
  // x 0 0 0 0 0
  // d 0 0 0 1 0
  // e 0 0 0 0 2
  const targetLetters = target.split('');
  let maxLengthMatch = 0;
  let matchWordIdx = -1;

  for (let dictWordIdx = 0; dictWordIdx < dict.length; dictWordIdx += 1) {
    const dictWordLetters = dict[dictWordIdx].split('');
    const dynamicMatrix = Array.from({ length: dictWordLetters.length }, () =>
      Array.from({ length: targetLetters.length }, () => 0),
    );
    let currLengthMatch = 0;

    for (
      let letterIdx = 0;
      letterIdx < Math.min(targetLetters.length, dictWordLetters.length);
      letterIdx += 1
    ) {
      if (targetLetters[letterIdx] === dictWordLetters[letterIdx]) {
        const prevCounter = dynamicMatrix[letterIdx - 1]?.[letterIdx - 1] ?? 0;
        dynamicMatrix[letterIdx][letterIdx] = prevCounter + 1;

        if (dynamicMatrix[letterIdx][letterIdx] > currLengthMatch) {
          currLengthMatch = dynamicMatrix[letterIdx][letterIdx];
        }
      }
    }

    if (currLengthMatch > maxLengthMatch) {
      maxLengthMatch = currLengthMatch;
      matchWordIdx = dictWordIdx;
    }
  }

  console.log(
    `Longest substring ${target}:${dict[matchWordIdx]} (idx: ${matchWordIdx}) | Same letters in same positions: ${maxLengthMatch}`,
  );
}

function longestSubsequenceDynamicSolve({ target, dict }: { target: string; dict: string[] }) {
  //   a b c c e
  // b 0 1 1 1 1
  // c 0 1 2 2 2
  // x 0 1 2 2 2
  // e 0 1 1 2 3
  const targetLetters = target.split('');
  let maxLengthMatch = 0;
  let matchWordIdx = -1;
  let successMatrix: number[][] = [[]];

  for (let dictWordIdx = 0; dictWordIdx < dict.length; dictWordIdx += 1) {
    const dictWordLetters = dict[dictWordIdx].split('');
    const dynamicMatrix = Array.from({ length: dictWordLetters.length }, () =>
      Array.from({ length: targetLetters.length }, () => 0),
    );
    let currLengthMatch = 0;

    for (let dictLetterIdx = 0; dictLetterIdx < dictWordLetters.length; dictLetterIdx += 1) {
      for (let targetLetterIdx = 0; targetLetterIdx < targetLetters.length; targetLetterIdx += 1) {
        if (targetLetters[targetLetterIdx] === dictWordLetters[dictLetterIdx]) {
          const prevMatchCounter = dynamicMatrix[dictLetterIdx - 1]?.[targetLetterIdx - 1] ?? 0;
          dynamicMatrix[dictLetterIdx][targetLetterIdx] = prevMatchCounter + 1;
        } else {
          const prevLeftNeighborMatchCount =
            dynamicMatrix[dictLetterIdx]?.[targetLetterIdx - 1] ?? 0;
          const prevTopNeighborMatchCount =
            dynamicMatrix[dictLetterIdx - 1]?.[targetLetterIdx] ?? 0;

          dynamicMatrix[dictLetterIdx][targetLetterIdx] = Math.max(
            prevLeftNeighborMatchCount,
            prevTopNeighborMatchCount,
          );
        }

        if (dynamicMatrix[dictLetterIdx][targetLetterIdx] > currLengthMatch) {
          currLengthMatch = dynamicMatrix[dictLetterIdx][targetLetterIdx];
        }
      }
    }

    if (currLengthMatch > maxLengthMatch) {
      maxLengthMatch = currLengthMatch;
      matchWordIdx = dictWordIdx;
      successMatrix = dynamicMatrix;
    }
  }

  successMatrix.forEach((r) => console.log(r));
  console.log(
    `Longest subsequence ${target}:${dict[matchWordIdx]} (idx: ${matchWordIdx}) | Same letters in same positions (even shifted): ${maxLengthMatch}`,
  );
}

// const progressionDiff = (dictMaxGradation - dictMinGradation) / (differentNumsAmount - 1);

// O(m*n) i guess, m items, then compare each n times (gradation)
function optimizedItemsSetWithLimitation() {
  //   const dict: TDict = {
  //     a: [7, 0.5],
  //     b: [6, 0.5],
  //     c: [9, 1],
  //     d: [9, 2],
  //     e: [8, 0.5],
  //   };
  const dict: TDict = {
    a: [10, 3],
    b: [3, 1],
    c: [9, 2],
    d: [5, 2],
    e: [6, 1],
  };
  const gradationDict = range(1, 6, 1);
  optimizedItemsSetWithLimitationDynamicSolve({ dict, gradationDict });
}

function longestSubsequence() {
  const target = 'awart';
  const dict: string[] = ['apple', 'aawke', 'garden', 'ward', 'art'];
  longestSubsequenceDynamicSolve({ target, dict });
}

function longestSubstring() {
  const target = 'awart';
  const dict: string[] = ['apple', 'awake', 'aware', 'wanted', 'garden', 'ward', 'art'];
  longestSubstringDynamicSolve({ target, dict });
}

export function useDynamic() {
  optimizedItemsSetWithLimitation();
  console.log('=______________=');
  longestSubstring();
  console.log('=______________=');
  longestSubsequence();
}
