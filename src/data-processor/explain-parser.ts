import parse from "dotparser";
import dagre, { graphlib } from "dagre";
import Graph = graphlib.Graph;

export const explainParser = (str: string) => {
  const ast = parse(str);
  const graph = new Graph();

  graph.setGraph({
    rankdir: "LR",
  });
  graph.setDefaultEdgeLabel(() => ({}));

  const children = ast[0].children;

  const nodes = children.filter((item: any) => item.type === "node_stmt");
  const edges = children.filter((item: any) => item.type === "edge_stmt");

  nodes.forEach((node: any) => {
    graph.setNode(node.node_id.id, { label: node.node_id.id, width: 120, height: 50 });
  });

  edges.forEach((edge: any) => {
    graph.setEdge(edge.edge_list[0].id, edge.edge_list[1].id);
  });

  dagre.layout(graph);
  return graph;
};

type FlowGraph = {
  nodes: {
    id: string;
    label: string | undefined;
    width: number;
    height: number;
    position: {
      x: number;
      y: number;
    };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
};

export function graphToFlow(graph: Graph): FlowGraph {
  const nodes = graph.nodes().map((node) => {
    const { label, width, height, x, y } = graph.node(node);
    return { id: node, label, width, height, position: { x, y } };
  });
  const edges = graph.edges().map((edge) => {
    const { v, w } = edge;
    return { id: `${v}-${w}`, source: v, target: w };
  });
  return { nodes, edges };
}
