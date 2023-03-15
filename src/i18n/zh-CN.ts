import type { PagePath } from "./pagePath";

import _global from "@i18n/zh-CN/$.json";
import _index from "@i18n/zh-CN/_.json";
import _chatgpt from "@i18n/zh-CN/_chatgpt.json";
import _chatgptGeneral from "@i18n/zh-CN/_chatgpt-general.json";
import _chatgptGeneratorCot from "@i18n/zh-CN/_chatgpt-generator-cot.json";
import _chatgptInteractiveGame from "@i18n/zh-CN/_chatgpt-interactive-game.json";
import _chatgptPromptRolePlay from "@i18n/zh-CN/_chatgpt-prompt-role-play.json";
import _chatgptSamples from "@i18n/zh-CN/_chatgpt-samples.json";
import _chatgptSampleDetail from "@i18n/en-US/chatgpt-samples/$.json";
import _githubCopilotSamples from "@i18n/zh-CN/_github-copilot-samples.json";
import _resources from "@i18n/zh-CN/_resources.json";
import _stableDiffusionExamples from "@i18n/zh-CN/_stable-diffusion-examples.json";
import _stableDiffusionGenerator from "@i18n/zh-CN/_stable-diffusion-generator.json";
import _chatgptStartlingByEachStep from "@i18n/zh-CN/_chatgpt-flow.json";
import _chatgptStartlingByEachStepDetail from "@i18n/zh-CN/chatgpt-flow/$.json";

export type GlobalKey = keyof typeof _global;
const pages = {
  "/": _index,
  "/chatgpt/": _chatgpt,
  "/chatgpt-general/": _chatgptGeneral,
  "/chatgpt-generator-cot/": _chatgptGeneratorCot,
  "/chatgpt-interactive-game/": _chatgptInteractiveGame,
  "/chatgpt-prompt-role-play/": _chatgptPromptRolePlay,
  "/chatgpt-flow/": _chatgptStartlingByEachStep,
  "/chatgpt-flow/$": _chatgptStartlingByEachStepDetail,
  "/chatgpt-samples/": _chatgptSamples,
  "/chatgpt-samples/$": _chatgptSampleDetail,
  "/github-copilot-samples/": _githubCopilotSamples,
  "/resources/": _resources,
  "/stable-diffusion-examples/": _stableDiffusionExamples,
  "/stable-diffusion-generator/": _stableDiffusionGenerator,
} satisfies Record<PagePath, any>;
export type PageKey<P extends PagePath> = keyof (typeof pages)[P];

const i18nDataZhCN = {
  "*": _global,
  ...pages,
};
export default i18nDataZhCN;
