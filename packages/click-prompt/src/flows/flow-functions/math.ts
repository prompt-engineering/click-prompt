import { Parser } from "expr-eval";
import { isArray } from "lodash-es";

function executeEval(expression: string, value: any) {
  const parser = new Parser();
  try {
    const expr = parser.parse(expression);
    return expr.evaluate({ value });
  } catch (e) {
    console.log(e);
    return value;
  }
}

function exprObjectMath(value: any, updatePropKey: string | undefined, expr: string) {
  const newValue = value;
  if (updatePropKey) {
    newValue[updatePropKey] = executeEval(expr, value);
  }

  return newValue;
}

function exprMath(value: any, updatePropKey: string | undefined, expr: string) {
  if (typeof value === "object") {
    return exprObjectMath(value, updatePropKey, expr);
  }

  return executeEval(expr, value);
}

/**
 * Math evaluator
 * @param expr, the expression to evaluate
 * @param value, if the value is an array, evaluate the expression for each element, if the value is an object, evaluate the expression for the object
 * @param updatePropKey, if the value is an object, update the value of the key
 *
 * @example
 * const expr = "value.x + 1";
 * const value = { x: 1 };
 * const propKeys = ["x"];
 *
 * const result = math(expr, value, propKeys);
 * // result = { x: 2 }
 */
export const math = (expr: string, value: any, updatePropKey?: string) => {
  if (isArray(value)) {
    return value.map((v) => exprMath(v, updatePropKey, expr));
  }

  return exprMath(value, updatePropKey, expr);
};
