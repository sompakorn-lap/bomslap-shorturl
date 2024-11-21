import { Elysia, t } from "elysia";
import { findLongUrl, shortenerUrl } from "./features/url/url.service";
import { UrlSchema } from "./features/url/url.model";
import { dbConnect } from "./libs/mongoose/dbConnect";
import staticPlugin from "@elysiajs/static";

dbConnect();

const app = new Elysia()
  .use(staticPlugin({
    assets: "../client/dist",
    prefix: "/"
  }))
  .get("/", () => Bun.file("../client/dist/index.html"))
  .post("/api", async ({ body: { longUrl } }) => 
    await shortenerUrl(longUrl), 
  {
    body: t.Pick(UrlSchema, ["longUrl"])
  })
  .get("/:shortUrl", async ({ params: { shortUrl }, redirect }) => redirect(await findLongUrl(shortUrl)))
  .listen(3000)
;

console.log(`running at ${app.server?.hostname}:${app.server?.port}`);
