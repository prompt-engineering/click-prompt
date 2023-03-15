# ChatGPT StartlingByEachStep

Simple DSL with components:

```
- $$placeholder$$: placeholder
- $$response:1$$: means the second response, because array index start from 0
```

DataStructure:

```yaml
name: Interactive User Journey
category: Development
author: Phodal Huang
description: In this example, we will design a user journey for online shopping.
explain: |
  digraph G {
    0[custom = "prompt"]
    1[custom = "prompt,interactive"]
    2[custom = "prompt,interactive"]
    3[custom = "prompt,interactive"]
    4[custom = "prompt,interactive"]
    0 -> 1
    1 -> 2
    1 -> 3
    1 -> 4
  }

steps:
  - name: 设计用户旅程
    ask: |
      design a user journal for $$placeholder$$
    values:
      placeholder: online shopping
    cachedResponseRegex: .*
```

for explain:

1. we use Graphviz to generate the graph, you can use [Graphviz Online](https://dreampuf.github.io/GraphvizOnline/) to generate the graph.
2. number is the step index, and the `custom` is the step type, `prompt` is the normal step, `interactive` is the interactive step.
