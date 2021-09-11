import { rest } from "msw";
import ping from "./fixtures/ping.json";
import upload from "./fixtures/upload.json";
import replays from "./fixtures/replays.json";
import replaysData from "./fixtures/replaysData.json";
import DataPerRank from "./fixtures/DataPerRank.json";

import { apiURL } from "../hooks/useFetch";

export const handlers = [
  rest.get(`${apiURL}/`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json(ping));
  }),
  rest.post(`${apiURL}/v2/upload`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(201), ctx.json(upload));
  }),
  rest.get(`${apiURL}/replays`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json(replays));
  }),
  rest.get(`${apiURL}/replays/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.delay(), ctx.status(200), ctx.json(replaysData[id]));
  }),
  rest.get(
    `https://ballchasing.com/population/average/stats`,
    (req, res, ctx) => {
      return res(ctx.delay(), ctx.status(200), ctx.json(DataPerRank));
    }
  ),
];
