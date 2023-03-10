import { StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/StepDetail";

export type StartlingStep = {
  name: string;
  category: string;
  author: string;
  description: string;
  steps: StepDetail[];
};
