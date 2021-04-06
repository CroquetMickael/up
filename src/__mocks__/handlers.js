import { rest } from "msw";
import ping from "./fixtures/ping.json";

export const handlers = [
  rest.get("https://ballchasing.com/api/", (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json(ping)
    );
  }),
];
