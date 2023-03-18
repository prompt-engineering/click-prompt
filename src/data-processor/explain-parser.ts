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
    const data = node.attr_list.reduce((acc: any, item: any) => {
      acc[item.id] = item.eq;
      return acc;
    }, {});
    graph.setNode(node.node_id.id, { label: node.node_id.id, width: 120, height: 50, data });
  });

  edges.forEach((edge: any) => {
    graph.setEdge(edge.edge_list[0].id, edge.edge_list[1].id);
  });

  dagre.layout(graph);
  return graph;
};

type CustomFieldData = {
  flowType?: string;
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
    data?: CustomFieldData;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
};

export function graphToFlow(graph: Graph): FlowGraph {
  const nodes = graph.nodes().map((nodeStr) => {
    const node = graph.node(nodeStr);
    const { label, width, height, x, y } = node;
    let data = {};
    if (node.hasOwnProperty("data")) {
      data = (node as any)["data"];
    }

    return { id: nodeStr, label, width, height, position: { x, y }, data };
  });
  const edges = graph.edges().map((edge) => {
    const { v, w } = edge;
    return { id: `${v}-${w}`, source: v, target: w };
  });

  return { nodes, edges };
}
