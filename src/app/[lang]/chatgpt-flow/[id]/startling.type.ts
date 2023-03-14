import { StepDetail } from "@/app/[lang]/chatgpt-flow/[id]/step-detail";

export type StartlingStep = {
  name: string;
  category: string;
  author: string;
  explain?: string;
  description: string;
  steps: StepDetail[];
};
