import http from "node:http";

import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";
import { extractQueryParams } from "./utils/extract-route-path.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }
});

server.listen(3333);
