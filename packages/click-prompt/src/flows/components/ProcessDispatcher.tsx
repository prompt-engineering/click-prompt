import { ActionProcess } from "@/flows/types/flow-action";
import { jsonPath } from "@/flows/flow-functions/jsonPath";

export function processDispatcher(postProcesses: ActionProcess[], data: any) {
  //iterator postProcesses and set to result
  let result = data;
  postProcesses.forEach((process) => {
    switch (process.function) {
      case "jsonPath":
        if (!process.args || process.args.length < 2) {
          throw new Error("jsonPath function need 2 arguments");
        }
        result = jsonPath(result, process.args[0], process.args[1]);
        break;
      case "fromMarkdown":
        break;
      case "toMarkdown":
        break;
      default:
        break;
    }
  });

  return result;
}
