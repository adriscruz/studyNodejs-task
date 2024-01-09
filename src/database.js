export class Database {
  database = {
    tasks: [],
  };

  select(table) {
    const data = this.database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (!this.database[table]) {
      this.database[table] = [data];
    } else {
      this.database[table].push(data);
    }

    return data;
  }
}
