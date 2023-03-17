import { FlowStep } from "@/flows/action/flow-action";

export type StartlingFlow = {
  name: string;
  category: string;
  author: string;
  explain?: string;
  description: string;
  steps: FlowStep[];
  stepGuide?: boolean;
};
