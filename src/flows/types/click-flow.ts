import { FlowStep } from "@/flows/types/flow-step";

export type StartlingFlow = {
  name: string;
  category: string;
  author: string;
  explain?: string;
  description: string;
  steps: FlowStep[];
  stepGuide?: boolean;
};
