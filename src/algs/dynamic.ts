/* eslint-disable */

type TDict = { [key: string]: [number, number] };

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

function dynamicSolve({ dict, gradationDict }: { dict: TDict; gradationDict: number[] }) {
  const dictVals = Object.values(dict);

  const gradationDictReverseHash = gradationDict.reduce((acc, el, idx) => {
    acc[el] = idx;
    return acc;
  }, {});

  const dynamicMatrix = Array.from({ length: dictVals.length }, () =>
    Array.from({ length: gradationDict.length }, () => 0),
  );

  console.log('----');
  dynamicMatrix.forEach((_) => console.log(_));
  console.log(gradationDict);
  console.log(gradationDictReverseHash);
  console.log('-------------');

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
        const prevRowValue = dynamicMatrix[weightIdx - 1]?.[gradationIdx] ?? 0;
        dynamicMatrix[weightIdx][gradationIdx] = prevRowValue;
      } else if (gradationCurr === dictGradationBase) {
        // here it fits into gradations
        // now we can fit only this element weight or take weight of 1 row above if it has higher value
        const prevRowValue = dynamicMatrix[weightIdx - 1]?.[gradationIdx] ?? 0;
        if (prevRowValue > dictWeightBase) {
          dynamicMatrix[weightIdx][gradationIdx] = prevRowValue;
        } else {
          dynamicMatrix[weightIdx][gradationIdx] = dictWeightBase;
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
        } else {
          dynamicMatrix[weightIdx][gradationIdx] = dynamicMatrix[weightIdx - 1][gradationIdx];
        }
      }
    }
  }

  console.log('----');
  dynamicMatrix.forEach((_) => console.log(_));
}

// i have no more brain power to think of big O right now, just commit, it works...
export function useDynamic() {
  const dict: TDict = {
    a: [10, 3],
    b: [3, 1],
    c: [9, 2],
    d: [5, 2],
    e: [6, 1],
  };
  //   let dictMinGradation = Number.POSITIVE_INFINITY;
  //   let dictMaxGradation = 0;
  //   let differentNumsAmount = 0;

  //   for (let [weight, gradation] of dictVals) {
  //     console.log(gradation, dictMinGradation, dictMaxGradation, differentNumsAmount);
  //     if (gradation < dictMinGradation) {
  //       dictMinGradation = gradation;
  //       differentNumsAmount += 1;
  //     }
  //     if (gradation > dictMaxGradation) {
  //       dictMaxGradation = gradation;
  //       differentNumsAmount += 1;
  //     }
  //   }

  // const progressionDiff = (dictMaxGradation - dictMinGradation) / (differentNumsAmount - 1);
  const gradationDict = range(1, 6, 1);
  //   const dict: TDict = {
  //     a: [7, 0.5],
  //     b: [6, 0.5],
  //     c: [9, 1],
  //     d: [9, 2],
  //     e: [8, 0.5],
  //   };

  dynamicSolve({ dict, gradationDict });
}
