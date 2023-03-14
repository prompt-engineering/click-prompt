import { StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/step-detail";

export type StartlingStep = {
  name: string;
  category: string;
  author: string;
  description: string;
  steps: StepDetail[];
};
