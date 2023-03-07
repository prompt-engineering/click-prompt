const fs = require("fs");
const Papa = require("papaparse");

// 1. loading the csv file from src/assets/data/ai-resources.csv
// 2. parsing the csv file
// 3. generating the json file to src/assets/data/ai-resources.json
function convertCsvToJson(csvName, languages) {
  languages.forEach((lang) => {
    const csvFilePath = `./public/${lang}/data/${csvName}.csv`;
    const jsonFilePath = `./src/assets/resources/${lang}/${csvName}.json`;
    const csvFile = fs.readFileSync(csvFilePath, "utf8");
    const json = Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(json.data));
  });
}

const languages = ["zh-cn", "en-us"];

convertCsvToJson("ai-resources", languages);
convertCsvToJson("reading-list-en", languages);
convertCsvToJson("reading-list-cn", languages);
