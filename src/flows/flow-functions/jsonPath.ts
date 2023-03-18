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
  const matchedObjects = JSONPath({ path, json });
  // 遍历匹配的对象数组
  return matchedObjects.map((obj: { [x: string]: any }) => {
    // 使用keys数组提取所需的属性值
    const extractedValues = keys.map((key) => obj[key]);

    // 返回提取的属性值构成的对象
    return Object.fromEntries(keys.map((key, i) => [key, extractedValues[i]]));
  });
}
