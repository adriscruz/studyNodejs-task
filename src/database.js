import fs from "node:fs/promises";

const databasePath = new URL("../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    this.#load();
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (!this.#database[table]) {
      this.#database[table] = [data];
    } else {
      this.#database[table].push(data);
    }

    this.#persist();

    return data;
  }

  #load() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }
}
