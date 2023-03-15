/* eslint-disable @typescript-eslint/no-unused-vars */

import { useFrequencyMap } from './algs/frequency-map';
import { useTurtleRabbit } from './algs/turtle-rabbit';
import { useBinarySearch } from './algs/binary-search';
import { useBST } from './algs/binary-search-tree';
import { useIsPalindrome } from './algs/palindrome';
import { usePermutations } from './algs/permutations';
import { useQS } from './algs/quick-sort';
import { useBellman } from './algs/graph-bellman';
import { useDijkstra } from './algs/graph-dijkstra';
import { useDijkstraRewrite } from './algs/etc/dijkstra-random-rewrite';
import { useDynamic } from './algs/dynamic';

function init() {
  // useFrequencyMap();
  // useTurtleRabbit();
  // useBinarySearch();
  // useBST();
  // useIsPalindrome();
  // usePermutations();
  // useQS();
  // useBellman();
  // useDijkstra();
  // useDijkstraRewrite();
  useDynamic();
}

init();
