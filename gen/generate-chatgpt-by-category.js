// 1. convert resources in src/assets/chatgpt/category/*.yml to json
// 2. generate src/assets/chatgpt/category.json
// the yaml file is like this:
// ```yml
// name:
//   zh-cn: 编程
//   en-us: Programming
// category: Programming
// samples:
//   - name: name
//     ask: string
//     response: string
// ```
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const walkdir = require("walkdir");

const categoriesDir = path.join(__dirname, "../src/assets/chatgpt/category");
const categoriesFile = path.join(categoriesDir, "index.json");

const files = walkdir.sync(categoriesDir, { no_recurse: true });
const index = files
  .filter((f) => f.endsWith(".yml"))
  .map((f) => {
    const content = fs.readFileSync(f, "utf8");
    const doc = yaml.load(content);
    const { name, category, samples } = doc;
    return { name, category, samples };
  });

fs.writeFileSync(categoriesFile, JSON.stringify(index, null, 2));
