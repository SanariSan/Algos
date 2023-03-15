/* eslint-disable no-param-reassign */

type TGraph = Record<string, Record<string, number>>;
type TCosts = Record<keyof TGraph, number>;
type TParents = Record<keyof TGraph, string | undefined>;
type TProcessed = Array<keyof TGraph>;

function getMinCostNodeKey({
  costs,
  processed,
}: {
  costs: TCosts;
  processed: TProcessed;
}): (keyof TCosts & PropertyKey) | undefined {
  let min = Number.POSITIVE_INFINITY;
  let minCostNodeKey: (keyof TCosts & PropertyKey) | undefined;

  Object.entries(costs).forEach(([key, value]) => {
    if (!processed.includes(key) && value < min) {
      min = value;
      minCostNodeKey = key;
    }
  });

  return minCostNodeKey;
}

function getQuickestPathDetails({
  costs,
  parents,
  startKey,
  finishKey,
}: {
  costs: TCosts;
  parents: TParents;
  startKey: keyof TGraph;
  finishKey: keyof TGraph;
}) {
  const path: string[] = [];
  let nodeKey: keyof TGraph = parents[finishKey] as string;

  while (nodeKey !== startKey) {
    path.unshift(nodeKey);
    nodeKey = parents[nodeKey] as string;
  }

  path.unshift(startKey);
  path.push(finishKey);

  return { quickestPath: path, quickestPathCost: costs[finishKey] };
}

export function dijkstra({ graph, startKey = 's' }: { graph: TGraph; startKey?: string }) {
  const costs: TCosts = {};
  const parents: TParents = {};

  // initialize all nodes costs and parents
  Object.keys(graph).forEach((el) => {
    costs[el] = Number.POSITIVE_INFINITY;
    parents[el] = undefined;
  });

  // fill start node neighbors
  Object.keys(graph[startKey]).forEach((el) => {
    costs[el] = graph[startKey][el];
    parents[el] = startKey;
  });

  const processed: TProcessed = [];
  let minCostNodeKey = getMinCostNodeKey({ costs, processed });

  while (minCostNodeKey !== undefined) {
    const neighbors = graph[minCostNodeKey];

    // eslint-disable-next-line no-restricted-syntax
    for (const neighborKey of Object.keys(neighbors)) {
      if (costs[neighborKey] > costs[minCostNodeKey] + neighbors[neighborKey]) {
        costs[neighborKey] = costs[minCostNodeKey] + neighbors[neighborKey];
        parents[neighborKey] = minCostNodeKey;
      }
    }

    processed.push(minCostNodeKey);
    minCostNodeKey = getMinCostNodeKey({ costs, processed });
  }

  return { costs, parents };
}

// E = edges, V = vertices
// djikstra O(E * log(V))
export function useDijkstra() {
  const graph = {
    s: { a: 10 },
    a: { b: 20 },
    b: { c: 1, f: 30 },
    c: { a: 1 },
    f: {},
  };

  // const graph = {
  //   s: { a: 5, b: 2 },
  //   a: { c: 4, d: 2 },
  //   b: { a: 8, d: 7 },
  //   c: { d: 6, f: 3 },
  //   d: { f: 1 },
  //   f: {},
  // };

  // const graph = {
  //   s: { a: 6, b: 2 },
  //   a: { f: 1 },
  //   b: { a: 3, f: 5 },
  //   f: {},
  // };

  // get filled entities
  const { costs, parents } = dijkstra({ graph });

  console.dir({ graph, costs, parents }, { depth: 10 });

  // extract useful info from entities
  console.log(
    getQuickestPathDetails({
      costs,
      parents,
      startKey: 's',
      finishKey: 'f',
    }),
  );
}
