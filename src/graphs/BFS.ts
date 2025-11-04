import Queue from '../../node_modules/yocto-queue/index';

// a --- b --- c
// |     |     |
// d --- e --- f

const graph = {
  a: ['b', 'd'],
  b: ['a', 'c', 'e'],
  c: ['b', 'f'],
  d: ['a', 'e'],
  e: ['d', 'b', 'f'],
  f: ['c', 'e'],
};

const graphFromBook = {
  s: ['a', 'b'],
  a: ['s', 'c'],
  b: ['s', 'c', 'd'],
  c: ['a', 'b', 'd', 'e'],
  d: ['b', 'c', 'e'],
  e: ['c', 'd'],
};

type Graph = Record<string, string[]>;

const bfs = (graph: Graph, s: string): void => {
  const seen = new Set([s]);

  const distancesFromS = new Map();

  for (const node of Object.keys(graph)) {
    const d = node === s ? 0 : Infinity;
    distancesFromS.set(node, d);
  }

  const queue = new Queue<string>();
  queue.enqueue(s);

  while (queue.size) {
    const curr = queue.dequeue();
    for (const neighbor of graph[curr]) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.enqueue(neighbor);
        distancesFromS.set(neighbor, distancesFromS.get(curr) + 1);
      }
    }
  }
  console.dir(distancesFromS);
};

// Only run when this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  bfs(graphFromBook, 's');
}
