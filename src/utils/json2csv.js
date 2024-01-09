import { Parser } from "json2csv";
import fs from "fs";

async function convertJsonToCsv(jsonFilePath, csvFilePath) {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  const json2csvParser = new Parser();
  const csvData = json2csvParser.parse(jsonData);

  fs.writeFileSync(csvFilePath, csvData);
}

convertJsonToCsv("../../database.json", "../../tasks.csv");
