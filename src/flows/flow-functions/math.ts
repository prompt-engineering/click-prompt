import { Parser } from "expr-eval";

export const math = (value: any, expression: string) => {
  const parser = new Parser();
  try {
    const expr = parser.parse(expression);
    return expr.evaluate({ value });
  } catch (e) {
    console.log(e);
    return value;
  }
};
