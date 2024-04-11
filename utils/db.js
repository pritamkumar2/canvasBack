import { config } from "dotenv";
import mongoose from "mongoose";

config();

const dbURI = process.env.DATABASE;




const connectDb = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to database");
  } catch (err) {
    console.log("database connection error",err);
    process.exit(0);
  }
};

export default connectDb