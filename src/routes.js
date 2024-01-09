import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "Get",
    path: "/tasks",
    handler: async (request, response) => {
      const tasks = await database.select("tasks");
      return response.json(tasks);
    },
  },
  {
    method: "Post",
    path: "/tasks",
    handler: async (request, response) => {
      const data = await request.body();
      const task = {
        id: randomUUID(),
        ...data.value,
      };

      await database.insert("tasks", task);

      return response.json(task);
    },
  },
];
