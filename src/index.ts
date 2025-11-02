import express, { Request, Response } from "express";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));

// Health check route
app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Blog API is running 🚀" });
});

// Routes
import { userRouter as userRoutes } from "./routes/user.routes";
app.use("/api/users", userRoutes);

import { postRouter as postRoutes } from "./routes/post.routes";
app.use("/api/posts", postRoutes);

// fallback
app.use((_req: Request, res: Response) => {
  return res.status(404).json({ success: false, message: "Route not found" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    chalk.bold.magentaBright(`✅ Server started on http://localhost:${PORT}`)
  );
});
