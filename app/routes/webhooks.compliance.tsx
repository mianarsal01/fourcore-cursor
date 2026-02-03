import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  let webhook;
  try {
    webhook = await authenticate.webhook(request);
  } catch (error) {
    console.error("Compliance webhook failed HMAC verification", error);
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { topic, shop, payload } = webhook;

    switch (topic) {
      case "customers/data_request":
      case "customers/redact":
        console.log(`Compliance webhook ${topic} for ${shop}`, payload);
        break;
      case "shop/redact":
        console.log(`Compliance webhook ${topic} for ${shop}`);
        await db.cursorSettings.deleteMany({ where: { shop } });
        await db.session.deleteMany({ where: { shop } });
        break;
      default:
        console.log(`Unhandled compliance webhook ${topic} for ${shop}`);
    }

    return new Response();
  } catch (error) {
    console.error("Compliance webhook handling failed", error);
    return new Response();
  }
};
