import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

// GET /api/posts
postRouter.get("/", getAllPosts);

// GET /api/posts/:id
postRouter.get("/:id", getPostById);

// POST /api/posts
postRouter.post("/", createPost);

// PUT /api/posts/:id
postRouter.put("/:id", updatePost);

// DELETE /api/posts/:id
postRouter.delete("/:id", deletePost);

export { postRouter };
