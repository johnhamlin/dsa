type Graph = Record<string, string[]>;

export const graph: Graph = {
  s: ["a", "b"],
  a: ["s", "c"],
  b: ["s", "c", "d"],
  c: ["a", "b", "d", "e"],
  d: ["b", "c", "e"],
  e: ["c", "d"],
};

const dfsIterative = (g: Graph, s: string) => {
  const seen = new Set<string>();
  const stack = [s];

  while (stack.length) {
    const curr = stack.pop();

    if (!seen.has(curr)) {
      console.log(curr);
      seen.add(curr);
      for (const neighbor of g[curr]) {
        stack.push(neighbor);
      }
    }
  }
};

// dfsIterative(graph, 's');

const dfsRecursive = (g: Graph, s: string) => {
  const seen = new Set<string>();

  const dfs = (node: string) => {
    console.log(node);
    seen.add(node);
    for (const neighbor of g[node]) {
      if (!seen.has(neighbor)) {
        dfs(neighbor);
      }
    }
  };

  console.log("dfsRecursiveWithoutHelperFn");

  return dfs(s);
};

// dfsRecursive(graph, 's');

const dfsRecursiveWithoutHelperFn = (
  g: Graph,
  s: string,
  seen = new Set<string>(),
) => {
  console.log(s);
  seen.add(s);
  for (const neighbor of g[s]) {
    if (!seen.has(neighbor)) {
      dfsRecursiveWithoutHelperFn(g, neighbor, seen);
    }
  }
};

console.log("run 1");
dfsRecursiveWithoutHelperFn(graph, "s");
console.log("run 2");
dfsRecursiveWithoutHelperFn(graph, "s");
