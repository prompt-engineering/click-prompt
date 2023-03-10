export type StepDetail = {
  name: string;
  ask: string;
  response?: string;
  cachedResponseRegex: string;
  values: Record<string, string>;
};

export type StartlingStep = {
  name: string;
  category: string;
  author: string;
  description: string;
  steps: StepDetail[];
};
