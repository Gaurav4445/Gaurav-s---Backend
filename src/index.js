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

    // Import all routes
    const userRouter = (await import("./routes/user.routes.js")).default;
    const healthcheckRouter = (await import("./routes/healthcheck.routes.js")).default;
    const videoRouter = (await import("./routes/video.routes.js")).default;
    const tweetRouter = (await import("./routes/tweet.routes.js")).default;
    const commentRouter = (await import("./routes/comment.routes.js")).default;
    const likeRouter = (await import("./routes/like.routes.js")).default;
    const playlistRouter = (await import("./routes/playlist.routes.js")).default;
    const subscriptionRouter = (await import("./routes/subscription.routes.js")).default;
    const dashboardRouter = (await import("./routes/dashboard.routes.js")).default;

    // Register all routes
    app.use("/api/v1/healthcheck", healthcheckRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/videos", videoRouter);
    app.use("/api/v1/tweets", tweetRouter);
    app.use("/api/v1/comments", commentRouter);
    app.use("/api/v1/likes", likeRouter);
    app.use("/api/v1/playlist", playlistRouter);
    app.use("/api/v1/subscriptions", subscriptionRouter);
    app.use("/api/v1/dashboard", dashboardRouter);

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
};

startServer();