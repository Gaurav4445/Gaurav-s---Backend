import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

startServer();