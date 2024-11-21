import { Elysia, t } from "elysia";
import { findLongUrl, shortenerUrl } from "./features/url/url.service";
import { UrlSchema } from "./features/url/url.model";
import { dbConnect } from "./libs/mongoose/dbConnect";

dbConnect();

const app = new Elysia()
  .get("/", () => "Hello World")
  .post("/api", async ({ body: { longUrl } }) => 
    await shortenerUrl(longUrl), 
  {
    body: t.Pick(UrlSchema, ["longUrl"])
  })
  .get("/:shortUrl", async ({ params: { shortUrl }, redirect }) => redirect(await findLongUrl(shortUrl)))
  .listen(3000)
;

console.log(`running at ${app.server?.hostname}:${app.server?.port}`);
