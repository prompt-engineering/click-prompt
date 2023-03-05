# ClickPrompt

[![ci](https://github.com/prompt-engineering/prompt-generator/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/prompt-generator/actions/workflows/ci.yaml)

> ClickPrompt 是一款全新的 Prompt 工具应用，可以帮助用户更好地编写 Prompt 并解放生产力。通过查看用户分享的 Prompt、一键运行多种 Prompt、
> 以及在线 Prompt 生成器，ClickPrompt 可以帮助你轻松高效地完成 Prompt 的编写。

## Features

- ChatGPT
  - 一键运行 ChatGPT
  - 查看用户分享 ChatGPT 的样例
  - 使用 ChatGPT 的 Prompt 生成器
- StableDiffusion
  - StableDiffusion 生成器
  - 查看用户分享 StableDiffusion 的样例
- ChatGPT
  - 查看用户分享 GitHub Copilot 的样例

在线地址：https://prompt.phodal.com

备用地址：https://clickprompt.vercel.app

## Join us

![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)

Only for discuss prompt engineering.

<img src="./public/wechat.jpg" width='256' height='auto' />

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

## License

This code is distributed under the MIT license. See `LICENSE` in this directory.
