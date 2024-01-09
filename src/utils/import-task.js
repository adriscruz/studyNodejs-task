import { parse } from "csv-parse";
import fs from "fs";
import fetch from "node-fetch";

async function sendCsvDataToServer(csvFilePath) {
  const parser = fs.createReadStream(csvFilePath).pipe(parse({ from_line: 2 }));

  for await (const row of parser) {
    const [title, description] = row;
    const response = await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const responseData = await response.json();
    console.log(responseData);
  }
}

sendCsvDataToServer("../../tasks.csv");
