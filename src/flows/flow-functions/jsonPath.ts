import jp from "jsonpath";

export function jsonPath(json: object, path: string) {
  return jp.query(json, path);
}
