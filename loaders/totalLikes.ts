import { AppContext } from "deco-sites/eliasfcampsimples/apps/site.ts";

export default async function totalLikes(
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
) {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "eliasfcampsimples",
    },
  });

  return response.json();
}
