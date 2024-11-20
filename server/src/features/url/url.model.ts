import { t } from "elysia";
import { model, Schema } from "mongoose";

export const UrlSchema = t.Object({
  shortUrl: t.String(),
  longUrl: t.String()
});

export type UrlType = typeof UrlSchema.static;

const Url = model<UrlType>("url", new Schema({
  shortUrl: String,
  longUrl: String
}));

export default Url;