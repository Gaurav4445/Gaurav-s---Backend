import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${db_name}`);
    
    console.log(`\n MongoDB connected successfully!`);
    console.log(` DB HOST: ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log(" MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
