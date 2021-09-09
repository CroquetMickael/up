import { rest } from "msw";
import ping from "./fixtures/ping.json";
import upload from "./fixtures/upload.json";

import { apiURL } from "../hooks/useFetch";

export const handlers = [
  rest.get(`${apiURL}/`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json(ping));
  }),
  rest.post(`${apiURL}/v2/upload`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(201), ctx.json(upload));
  }),
];
