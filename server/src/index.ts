import { Elysia, t } from "elysia";
import { findLongUrl, shortenerUrl } from "./features/url/url.service";
import { UrlSchema } from "./features/url/url.model";

const app = new Elysia()
  .get("/", () => "")
  .post("/", async ({ body: { longUrl } }) => await shortenerUrl(longUrl), {
    body: t.Pick(UrlSchema, ["longUrl"])
  })
  .get("/:shortUrl", async ({ params: { shortUrl }, redirect }) => {
    const longUrl = await findLongUrl(shortUrl);
    redirect(longUrl);
  })
  .listen(3000)
;

console.log(`running at ${app.server?.hostname}:${app.server?.port}`);
