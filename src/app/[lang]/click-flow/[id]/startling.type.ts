import { FlowStep } from "@/app/[lang]/click-flow/[id]/flow-step";

export type StartlingFlow = {
  name: string;
  category: string;
  author: string;
  explain?: string;
  description: string;
  steps: FlowStep[];
};
