import { connect } from "mongoose";

export async function dbConnect() {
  try {
    await connect(process.env.MONGODB_URI as string);
    console.log("connect database successfully");
  }
  catch (err) { console.error(err); }
}