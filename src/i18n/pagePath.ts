export const hadChildRoutes = ["click-flow", "chatgpt-samples"];

export const pages = [
  "/",
  "/chatgpt/",
  "/chatgpt-general/",
  "/chatgpt-generator-cot/",
  "/chatgpt-interactive-game/",
  "/click-flow/",
  "/click-flow/$",
  "/chatgpt-prompt-role-play/",
  "/chatgpt-samples/",
  "/chatgpt-samples/$",
  "/github-copilot-samples/",
  "/resources/",
  "/stable-diffusion-examples/",
  "/stable-diffusion-generator/",
  "/stable-diffusion-deepdanbooru/",
] as const;

export type PagePath = (typeof pages)[number];
