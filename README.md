# ClickPrompt - Streamline your prompt design

[![ci](https://github.com/prompt-engineering/click-prompt/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/click-prompt/actions/workflows/ci.yaml)

<img src="src/assets/logo.svg" width='128' height='128' alt='ClickPrompt Logo' />

> ClickPrompt 是一款专为 Prompt 编写者设计的工具，它支持多种基于 Prompt 的 AI 应用，例如 Stable Diffusion、ChatGPT 和 GitHub Copilot 等。
> 使用 ClickPrompt，您可以轻松地查看、分享和一键运行这些模型，同时提供在线的 Prompt 生成器，使用户能够根据自己的需求轻松创建符合要求的 Prompt，并与其他人分享。

在线地址：https://prompt.phodal.com

备用地址：https://clickprompt.vercel.app

Join our WeChat group:

<img src="./public/wechat.jpg" width='256' height='auto' />

Features:

- [x] 支持用户样例展示功能，让用户可以查看、分享和参考其他用户的 Prompt 样例；
  - [x] 基于 GitHub Pull Request
  - [x] StableDiffusion
  - [x] ChatGPT
  - [x] GitHub Copilot
- [ ] 在线 Prompt 生成器，帮助用户快速生成符合需求的 Prompt；
  - [x] StableDiffusion 人物生成器
  - [x] StableDiffusion -> ChatGPT 生成器
- [ ] 提供一键运行功能，让用户轻松运行不同的 AI 应用；
  - [ ] ChatGPT 集成
  - [ ] StableDiffusion 集成
- [ ] 行业 Prompt 生成 API，为各行业提供高效的 AI 应用解决方案；
  - [ ] 编程
  - [ ] 写作
  - [ ] 设计

## Roadmap

Phase 1: MVP

- 支持基于 Prompt 的 AI 应用，包括 ChatGPT 和 Stable Diffusion。
- 提供 Prompt 生成器和一键运行功能。
- 提供用户样例展示功能。

Phase 2: 拓展功能

- 增加 GPT-3 和 DALL-E 等基于 Prompt 的 AI 应用。
- 提供用户自定义选项和多语言支持功能。
- 增加 AI 编辑器和用户权限管理功能。
- 支持 API 接口和其他第三方平台的集成。

Phase 3: 提高质量

- [ ] 改进 Prompt 生成器的算法，提高生成的文本质量和准确性。
- [ ] 增加用户反馈和评价功能，收集用户的建议和意见。
- [ ] 推广 ClickPrompt，并与各行业合作，为其提供高效的 AI 应用解决方案。

## Development

Tech Stacks:

- Next.js with Typescript
- Chakra UI
- Styled Components: @emotion/styled
- React Table
- React Markdown for render markdown
- Data processing
  - papaparse: parse csv
  - arrow: parse json

Todos:

- [x] setup projects
  - [x] init project
  - [x] setup CI
  - [x] config prettier, eslint, husky
  - [x] commit lint, style lint
- [ ] setup docs
- [ ] our cheatsheet
- [x] ChatGPT prompts
  - [ ] awesome act prompts
  - [ ] chinese version prompts
  - [ ] normal generator by category
  - [ ] random generator
  - [x] samples
- [x] Stable Diffusion
  - [ ] awesome act prompts
  - [ ] random generator
  - [x] normal generator
  - [x] samples
- [ ] GitHub Copilot
  - [x] samples

![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)

## License

This code is distributed under the MIT license. See `LICENSE` in this directory.
