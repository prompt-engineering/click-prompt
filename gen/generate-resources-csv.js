const fs = require("fs");
const Papa = require("papaparse");

// 1. loading the csv file from src/assets/data/ai-resources.csv
// 2. parsing the csv file
// 3. generating the json file to src/assets/data/ai-resources.json
function convertCsvToJson(csvName) {
  const csvFilePath = `./public/data/${csvName}.csv`;
  const jsonFilePath = `./src/assets/resources/${csvName}.json`;
  const csvFile = fs.readFileSync(csvFilePath, "utf8");
  const json = Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  fs.writeFileSync(jsonFilePath, JSON.stringify(json.data), "utf8");
}

convertCsvToJson("ai-resources");
convertCsvToJson("chatgpt-specific");

// todo: switch by languages

convertCsvToJson("reading-list_en-US");
convertCsvToJson("reading-list_zh-CN");

convertCsvToJson("role-play-prompts_zh-CN");
convertCsvToJson("role-play-prompts_en-US");
