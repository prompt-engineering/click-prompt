export type FlowAction = {
  name: string;
  type: FlowActionType;
  api?: ApiAction;
  open?: OpenAction;
  postProcessFunction?: "toMarkdown" | "jsonPath";
  preProcessFunction?: "fromMarkdown";
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

export type ActionResult = ActionSuccess | ActionError;
export type ActionSuccess = {
  success: true;
  result?: any;
};
export type ActionError = {
  success: false;
  error: string;
};
