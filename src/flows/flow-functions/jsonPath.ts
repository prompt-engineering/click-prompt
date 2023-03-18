import { JSONPath } from "jsonpath-plus";

export function jsonPath(json: object, path: string) {
  return JSONPath({ path, json });
}
