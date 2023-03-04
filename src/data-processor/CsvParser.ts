import Papa, { ParseResult } from "papaparse";

export const DefaultPapaConfig = {
  delimiter: ",",
  header: true,
  skipEmptyLines: true,
};

function parseCsv(csv: string): ParseResult<unknown> {
  return Papa.parse(csv, DefaultPapaConfig);
}

export default parseCsv;
