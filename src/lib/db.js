import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("DB Connected Successfull"))
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.log(error.message);
  }
}
