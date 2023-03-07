# ClickPrompt - Streamline your prompt design

[![ci](https://github.com/prompt-engineering/click-prompt/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/click-prompt/actions/workflows/ci.yaml)

<img src="src/assets/clickprompt-logo.svg" width='128' height='128' alt='ClickPrompt Logo' />

English | [简体中文](./README.zh-CN.md)

> ClickPrompt is a tool designed for Prompt writers, it supports a variety of Prompt-based AI applications, such as Stable Diffusion, ChatGPT, and GitHub Copilot, etc.
> With ClickPrompt, you can easily view, share, and run these models with one click, and an online prompt generator is provided to enable users to easily create prompts that meet their requirements and share them with others.

Try it：https://www.clickprompt.org/

Mirrors：

- https://prompt.phodal.com
- https://clickprompt.vercel.app

Join our WeChat group:

<img src="./public/wechat.jpg" width='256' height='auto' />

## Features:

- [x] Support samples display, allow users to view, share and refer to other users' prompt samples;
  - [x] Based on GitHub Pull Request
  - [x] StableDiffusion
  - [x] ChatGPT
  - [x] GitHub Copilot
- [ ] Online prompt generator, help users generate customized prompts which meet their requirements quickly;
  - [x] StableDiffusion character generator
  - [x] StableDiffusion -> ChatGPT generator
- [ ] Provide one-click run feature, support users to easily run different AI applications;
  - [ ] ChatGPT integration
  - [ ] StableDiffusion integration
- [ ] Industry Prompt generates APIs to provide efficient AI application solutions for various industries;
  - [ ] Coding
  - [ ] Writing
  - [ ] Design

## Roadmap

Phase 1: MVP

- Support for Prompt-based AI applications, including ChatGPT and Stable Diffusion.
- Provides prompt generator and one-click run.
- Provide user samples display.

Phase 2: Enhancement

- Added Prompt-based AI applications like GPT-3 and DALL-E.
- Provides user customization options and multilingual support.
- Added AI editor and user rights management feature.
- Support API interface and integration of other third-party platforms.

Phase 3: Improvement

- [ ] Improve the Prompt generator's algorithm to improve the quality and accuracy of the generated text.
- [ ] Add user feedback and evaluation features to collect user suggestions and opinions.
- [ ] Promote ClickPrompt and cooperate with various industries to provide them with efficient AI application solutions.

## Development

### Tech Stacks:

- Next.js with Typescript
- Chakra UI
- Styled Components: @emotion/styled
- React Table
- React Markdown for render markdown
- Data processing
  - papaparse: parse csv
  - arrow: parse json

### Todos:

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

### Run ClickPrompt

```shell
# Clone click-prompt
git clone https://github.com/prompt-engineering/click-prompt

cd click-prompt

npm install

# If you want to run Hugging Face integration locally
echo "NEXT_PUBLIC_HUGGING_FACE_ACCESS_TOKEN={Your Hugging Face Access Token}" > .env.local

npm run dev

# Build
npm run build
```

You can find more in [Contributors Guide](./CONTRIBUTING.md).

## Contributing Guide
New contributors welcome! Check out our [Contributors Guide](./CONTRIBUTING.md) for help getting started.

![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)

## Translate Guide

Speak another language natively?

Check out the dedicated [i18n guide](./TRANSLATING.md) for more details.

## License

This code is distributed under the MIT license. See `LICENSE` in this directory.
