const fs = require("fs");
const Papa = require("papaparse");

// 1. loading the csv file from src/assets/data/ai-resources.csv
// 2. parsing the csv file
// 3. generating the json file to src/assets/data/ai-resources.json
function convertCsvToJson(csvName) {
  const csvFilePath = `./public/data/${csvName}.csv`;
  const jsonFilePath = `./public/data/${csvName}.json`;
  const csvFile = fs.readFileSync(csvFilePath, "utf8");
  const json = Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  fs.writeFileSync(jsonFilePath, JSON.stringify(json.data));
}

convertCsvToJson("ai-resources");
convertCsvToJson("reading-list-en");
convertCsvToJson("reading-list-cnde");
