export const pages = [
  "/",
  "/chatgpt/",
  "/chatgpt-general/",
  "/chatgpt-generator-cot/",
  "/chatgpt-interactive-game/",
  "/chatgpt-prompt-role-play/",
  "/chatgpt-samples/",
  "/github-copilot-samples/",
  "/resources/",
  "/stable-diffusion-examples/",
  "/stable-diffusion-generator/",
] as const;

export type PagePath = (typeof pages)[number];
