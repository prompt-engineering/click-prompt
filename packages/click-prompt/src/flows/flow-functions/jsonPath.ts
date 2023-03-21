import { JSONPath } from "jsonpath-plus";

/**
 * Get the value of the JSONPath from the JSON object.
 * @param json JSON object to extract value from.
 * @param path JSONPath to match in the object.
 * @param keys Array of keys to extract from the matched object.
 * @returns Array of values extracted from the matched objects.
 *
 * @example
 * const json = [
 *   { name: "London", "population": 8615246 },
 *   { name: "Berlin", "population": 3517424 },
 *   { name: "Madrid", "population": 3165235 },
 *   { name: "Rome",   "population": 2870528 }
 * ];
 *
 * const path = "$..name";
 * const keys = ["name"];
 *
 * // Returns [{ name: "London" }, { name: "Berlin" }, { name: "Madrid" }, { name: "Rome" }]
 * const result = jsonPath(json, path, keys);
 */
export function jsonPath(json: object, path: string, keys: string[]) {
  const flatValues = JSONPath({ path, json });
  const result = [];

  for (let i = 0; i < flatValues.length; i += keys.length) {
    const obj: any = {};
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = flatValues[i + j];
    }
    result.push(obj);
  }

  return result;
}
