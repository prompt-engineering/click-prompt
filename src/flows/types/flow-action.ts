export type FlowAction = {
  name: string;
  type: FlowActionType;
  api?: ApiAction;
  open?: OpenAction;
  // the function after execute the api action
  postProcess?: ActionProcess[];
  // the function before execute the api action
  preProcess?: ActionProcess[];
  postComponents?: ActionPostComponent[];
};

export type ActionProcess = {
  function: "jsonPath" | "fromMarkdown" | "toMarkdown";
  args?: any[];
  outputVar?: string;
};

export type ActionPostComponent = {
  name: "JsonViewer" | "MarkdownViewer";
  args?: string;
};

export type FlowActionType = "api" | "open";
export type ApiAction = {
  url: string;
  method: string;
  headers: AuthKeyValues;
  body: string;
};

export type AuthKeyValues = {
  key: string;
  value: string;
}[];

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
