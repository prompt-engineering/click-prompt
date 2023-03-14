export const hadChildRoutes = ["chatgpt-startling-by-each-step", "chatgpt-samples"];

export const pages = [
  "/",
  "/chatgpt/",
  "/chatgpt-general/",
  "/chatgpt-generator-cot/",
  "/chatgpt-interactive-game/",
  "/chatgpt-startling-by-each-step/",
  "/chatgpt-startling-by-each-step/$",
  "/chatgpt-prompt-role-play/",
  "/chatgpt-samples/",
  "/chatgpt-samples/$",
  "/github-copilot-samples/",
  "/resources/",
  "/stable-diffusion-examples/",
  "/stable-diffusion-generator/",
] as const;

export type PagePath = (typeof pages)[number];
