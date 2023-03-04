export type StableDiffusionPrompt = {
  prompt: string;
  negativePrompt: string;
  steps: number;
  sampler: string;
  cfgScale: number;
  seed: number;
  size: string;
  modelHash: string;
  model: string;
};
