import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Import routes *after* DB connection
    const userRouter = (await import("./routes/user.routes.js")).default;
    app.use("/api/v1/users", userRouter);

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
};

startServer();
