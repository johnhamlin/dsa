import Queue from "yocto-queue";
import { graph } from "./UCC";
type Graph = Record<string, string[]>;

const UCC = (g: Graph) => {
  const seen = new Set<string>();

  let ccCount = 0;

  // start from every vertex once
  for (const v of Object.keys(g)) {
    // if we've already visited this node, it was reachable by some other CC
    if (!seen.has(v)) {
      // we're in a new CC
      ccCount++;

      // Explore it with BFS

      // Add the node from the for loop to a new queue
      const queue = new Queue<string>();
      queue.enqueue(v);

      while (queue.size) {
        const curr = queue.dequeue();
        // get the current vertex's neighbors from the adjaceny list and loop through them
        for (const neighbor of g[curr]) {
          if (!seen.has(neighbor)) {
            seen.add(neighbor);
            queue.enqueue(neighbor);
          }
        }
      }
    }
  }
  console.log(ccCount);
};

// Only run when this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  UCC(graph);
}
