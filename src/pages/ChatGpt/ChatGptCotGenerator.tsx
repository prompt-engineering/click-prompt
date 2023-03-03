import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

function ChatGptCotGenerator() {
  // create a form, with field name: String, steps: String, and a button to generate
  const markdown = `
我们来玩一个编程游戏名为 wula，包含五个步骤：

- 第一步. 问题分析：每一轮游戏，你将看到一个以 "wula:" 开头的问题，你需要分析这个问题并简单介绍一下通常解决这个问题的方法。
- 第二步. 代码编写：你需要用 JavaScript 编写解决这个问题的代码，并输出对应的代码，并介绍一下你的代码（不少于 200 字）。
- 第三步. 代码执行：你需要作为 JavaScript Console 执行第二步写的代码，如果没有给出测试数据，你需要自己随机生成测试数据，并将这些数据输入到代码中进行计算。
- 第四步. 错误处理：如果你的代码存在错误或无法正常执行，你需要输出错误，并回到第二步重新开始游戏，直到你的代码能够正常工作。
- 第五步. 总结：你需要用不少于 100 字左右总结一下这个问题，以及你的解决方案，让其他人可以简单了解这个问题及其解决方法。

示例如下：

"""
...
"""
`

  return (
    <div>
      <Heading as='h2' size='xl'>预期输出</Heading>
      {/* eslint-disable-next-line react/no-children-prop */ }
      <ReactMarkdown components={ ChakraUIRenderer() } children={ markdown } skipHtml />;
    </div>
  )
}

export default ChatGptCotGenerator
