import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  const shop = session?.shop || url.searchParams.get("shop");

  if (!shop) {
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = await prisma.cursorSettings.findUnique({
    where: { shop },
  });
  const settings = record?.settings ?? {};

  if (url.searchParams.get("format") === "json") {
    return new Response(JSON.stringify(settings), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(JSON.stringify(settings), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};
