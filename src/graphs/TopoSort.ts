import { Graph } from "./types";

// Four Node DAG
const graph: Graph = {
  s: ["v", "w"],
  v: ["t"],
  w: ["t"],
  t: [],
};

const TopoSort = (g: Graph) => {
  const seen = new Set<string>();
  let currLabel = Object.keys(g).length;

  for (const v of Object.keys(g)) {
    if (!seen.has(v)) {
      dfsTopo(g, v);
    }
  }

  function dfsTopo(g: Graph, s: string) {
    seen.add(s);
    for (const neighbor of g[s]) {
      if (!seen.has(neighbor)) {
        dfsTopo(g, neighbor);
      }
    }
    console.log("f position of " + s + " is " + currLabel);
    currLabel--;
  }
};

TopoSort(graph);
