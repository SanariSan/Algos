/* eslint-disable no-param-reassign */

type TGraph = Record<string, Record<string, number>>;
type TCosts = Record<keyof TGraph, number>;
type TParents = Record<keyof TGraph, string | undefined>;

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

function isIncomingParentConnectionCircular({
  parents,
  currentGraphNodeKey,
  neighborKey,
}: {
  parents: TParents;
  currentGraphNodeKey: keyof TGraph;
  neighborKey: keyof TGraph;
}) {
  let currentGraphNodeParent = parents[currentGraphNodeKey];
  let incomingCircular = false;
  while (currentGraphNodeParent !== undefined) {
    if (currentGraphNodeParent === neighborKey) {
      incomingCircular = true;
      break;
    }
    currentGraphNodeParent = parents[currentGraphNodeParent];
  }

  return incomingCircular;
}

export function bellmanFord({ graph, startKey = 's' }: { graph: TGraph; startKey?: string }) {
  const costs: TCosts = {};
  const parents: TParents = {};

  // initialize all nodes costs and parents
  Object.keys(graph).forEach((el) => {
    costs[el] = Number.POSITIVE_INFINITY;
    parents[el] = undefined;
  });

  costs[startKey] = 0;

  const graphVerticesAmount = Object.keys(graph).length;
  let i = 0;
  while (i < graphVerticesAmount) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [currentGraphNodeKey, currentGraphNodeNeighbors] of Object.entries(graph)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [neighborKey, neighborCost] of Object.entries(currentGraphNodeNeighbors)) {
        if (
          costs[currentGraphNodeKey] !== Number.POSITIVE_INFINITY &&
          costs[neighborKey] > costs[currentGraphNodeKey] + neighborCost
        ) {
          // prevent from creating circular path
          // yes it's increasing complexity by at worst O(E), but for now good enough...
          if (
            isIncomingParentConnectionCircular({
              parents,
              currentGraphNodeKey,
              neighborKey,
            })
          ) {
            // eslint-disable-next-line no-continue
            continue;
          }

          costs[neighborKey] = costs[currentGraphNodeKey] + neighborCost;
          parents[neighborKey] = currentGraphNodeKey;
        }
      }
    }

    i += 1;
  }

  let hasCircularPath = false;
  // eslint-disable-next-line no-restricted-syntax
  for (const [currentGraphNodeKey, currentGraphNodeNeighbors] of Object.entries(graph)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [neighborKey, neighborCost] of Object.entries(currentGraphNodeNeighbors)) {
      if (costs[neighborKey] > costs[currentGraphNodeKey] + neighborCost) {
        hasCircularPath = true;
      }
    }
  }

  return { costs, parents, hasCircularPath };
}

// E = edges, V = vertices
// bellman O(E * V) | *and with circular preventing probably O(E * E * V) ? | Should use SPFA for that
export function useBellman() {
  // const graph = {
  //   s: { a: 10, b: 20 },
  //   a: { c: 15 },
  //   b: { a: -30, c: 100 },
  //   c: { f: 1 },
  //   f: {},
  // };
  const graph = {
    s: { a: 10 },
    a: { b: 20 },
    b: { c: 5, f: 1 },
    c: { a: -100 },
    f: {},
  };
  // const graph = {
  //   s: { a: 10 },
  //   a: { b: 20 },
  //   b: { c: 1, f: 30 },
  //   c: { a: 1 },
  //   f: {},
  // };

  // get filled entities
  const { costs, parents, hasCircularPath } = bellmanFord({ graph });

  console.dir({ graph, costs, parents, hasCircularPath }, { depth: 10 });

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
