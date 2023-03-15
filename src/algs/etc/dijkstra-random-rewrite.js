function composePath({ parents, start, finish }) {
  const path = [];
  let currParentNodeKey = parents[finish];

  while (currParentNodeKey !== start) {
    path.unshift(currParentNodeKey);
    currParentNodeKey = parents[currParentNodeKey];
  }

  path.unshift(start);
  path.push(finish);

  return path.join('->');
}

function findMinCostNodeKey({ costs, processedNodes }) {
  let minVal = Number.POSITIVE_INFINITY;
  let minCostNodeKey = undefined;

  for (let [key, val] of Object.entries(costs)) {
    if (!processedNodes.includes(key) && val < minVal) {
      minVal = val;
      minCostNodeKey = key;
    }
  }

  return minCostNodeKey;
}

export function dj({ graph, start = 's', finish = 'f' }) {
  const costs = {};
  const parents = {};

  const graphKeys = Object.keys(graph);
  graphKeys.forEach((key) => {
    costs[key] = Number.POSITIVE_INFINITY;
    parents[key] = undefined;
  });

  const graphStartKeys = Object.keys(graph[start]);
  graphStartKeys.forEach((key) => {
    costs[key] = graph[start][key];
    parents[key] = start;
  });

  const processedNodes = [];
  let minCostNodeKey = findMinCostNodeKey({ costs, processedNodes });

  while (minCostNodeKey !== undefined) {
    const neighbors = graph[minCostNodeKey];

    for (let [neighborKey, neighborCost] of Object.entries(neighbors)) {
      const currTotalCost = costs[minCostNodeKey] + neighborCost;

      if (costs[neighborKey] > currTotalCost) {
        costs[neighborKey] = currTotalCost;
        parents[neighborKey] = minCostNodeKey;
      }
    }

    processedNodes.push(minCostNodeKey);
    minCostNodeKey = findMinCostNodeKey({ costs, processedNodes });
  }

  return { costs, parents };
}

// next day rewrite from scratch to check if I understood everything right
export function useDijkstraRewrite() {
  const graph = {
    s: { a: 1, b: 5 },
    a: { c: 7 },
    b: { a: 2, c: 1 },
    c: { f: 2 },
    f: {},
  };

  const { costs, parents } = dj({ graph });
  console.dir({ graph, costs, parents });

  const path = composePath({ parents, start: 's', finish: 'f' });
  console.log(path);
  console.log('Total cost: %s', costs['f']);
}
