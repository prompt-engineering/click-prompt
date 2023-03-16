export type FlowStep = {
  name: string;
  ask: string;
  response?: string;
  markdownEditor?: boolean;
  cachedResponseRegex: string;
  values: Record<string, string>;
  actions: FlowAction[];
};

export type FlowAction = {
  name: string;
  type: FlowActionType;
  api?: ApiAction;
  open?: OpenAction;
};

export type FlowActionType = "api" | "open";
export type ApiAction = {
  url: string;
  method: string;
  headers: {
    name: string;
    value: string;
  }[];
  body: string;
};

export type OpenAction = {
  scheme: string;
};

export function fillStepWithValued(
  step: FlowStep,
  cachedValue: Record<number, any>,
): { replaced: boolean; ask: string } {
  const regex = new RegExp(/\$\$([a-zA-Z0-9_]+)\$\$/);
  let newValue = step.ask;
  let isChanged = false;
  // 2. find $$placeholder$$ in step.ask
  if (step.ask && step.values) {
    const matched = step.ask.match(regex);
    if (matched) {
      // 1. replace $$placeholder$$ with step.values.placeholder
      const placeholder = matched[1];
      const value = step.values[placeholder];
      if (value) {
        isChanged = true;
        newValue = step.ask.replace(regex, value);
      }
    }
  }

  // 3. find value in cachedValue, format: $$response:1$$
  if (step.ask && cachedValue) {
    const regex = new RegExp(/\$\$response:([0-9]+)\$\$/);
    const matched = step.ask.match(regex);
    if (matched) {
      const index = parseInt(matched[1]);
      const value = cachedValue[index];
      if (value) {
        isChanged = true;
        newValue = step.ask.replace(regex, value);
      }
    }
  }

  return { replaced: isChanged, ask: newValue };
}
