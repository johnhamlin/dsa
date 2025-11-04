import Queue from '../../node_modules/yocto-queue/index';

type Graph = Record<string, string[]>;

export const graph: Graph = {
  '1': ['3', '5'],
  '2': ['4'],
  '3': ['1', '5'],
  '4': ['2'],
  '5': ['1', '3', '7', '9'],
  '6': ['8', '10'],
  '7': ['5'],
  '8': ['6'],
  '9': ['5'],
  '10': ['6'],
};

const ucc = (g: Graph) => {
  const seen = new Set<string>();

  let numCc = 0;
  const ccMap = new Map<string, string[]>();

  for (const node of Object.keys(g)) {
    // we're stepping through every node in the graph, but skipping ones we've seen
    if (!seen.has(node)) {
      // We're in a new Connected Component
      numCc++;
      console.log('Start of a new CC at node: ', node);

      // bfs starting at node i
      const queue = new Queue<string>();
      queue.enqueue(node);
      // optimization not in the book
      seen.add(node);

      while (queue.size) {
        const curr = queue.dequeue();
        console.log('Processing: ', curr);

        const ccMembers = ccMap.get(String(numCc)) ?? [];
        ccMembers.push(curr);
        ccMap.set(String(numCc), ccMembers);

        for (const neighbor of g[curr]) {
          if (!seen.has(neighbor)) {
            seen.add(neighbor);
            queue.enqueue(neighbor);
          }
        }
      }
    }
  }

  console.log({ numCc });
  console.dir(ccMap);
};

ucc(graph);
