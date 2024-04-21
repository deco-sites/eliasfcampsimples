import { AppContext } from "deco-sites/eliasfcampsimples/apps/site.ts";

export interface sendLikesProps {
  productId: string;
}

export default async function sendLikes(
  props: sendLikesProps,
  _req: Request,
  _ctx: AppContext,
) {
  const data = { productId: props.productId };

  console.log("data", data);

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "eliasfcampsimples",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}