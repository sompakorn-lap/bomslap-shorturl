import { error } from "elysia";
import Url from "./url.model";

function generateUrl(){
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const base = alphabet.length;

  let url = "";
  for(let i=0; i<5; i++){
    url += alphabet[Math.floor(Math.random() * base)];
  }
  return url;
}

export async function shortenerUrl(longUrl: string) {
  const baseUrl = process.env.BASE_URL as string;

  const available = await Url.findOne({ longUrl }).lean().exec();
  if(available)
    return available.shortUrl;

  const shortUrl = `${baseUrl}/${generateUrl()}`;
  await Url.create({
    shortUrl,
    longUrl
  });
  return shortUrl;
}

export async function findLongUrl(shortUrl: string) {
  const baseUrl = process.env.BASE_URL as string;

  const available = await Url.findOne({ shortUrl: `${baseUrl}/${shortUrl}` }).lean().exec();
  if(!available)
    throw error(404);

  return available.longUrl;
}