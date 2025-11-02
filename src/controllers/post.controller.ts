import { Request, Response } from "express";
import { prisma } from "../config/prisma.config";
import { sendResponse } from "../utils/response.util";

/**
 * @desc   Get all posts
 * @route  GET /api/posts
 * @access Public
 */
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });

    return sendResponse(res, 200, true, "Posts fetched successfully", posts);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return sendResponse(res, 500, false, "Failed to fetch posts");
  }
};

/**
 * @desc   Get single post by ID
 * @route  GET /api/posts/:id
 * @access Public
 */
export const getPostById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (!post) {
      return sendResponse(res, 404, false, "Post not found");
    }

    return sendResponse(res, 200, true, "Post fetched successfully", post);
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return sendResponse(res, 500, false, "Failed to fetch post");
  }
};

/**
 * @desc   Create a new post
 * @route  POST /api/posts
 * @access Public
 */
export const createPost = async (
  req: Request<{}, {}, { title: string; content: string; authorId: number }>,
  res: Response
) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return sendResponse(res, 400, false, "Missing required fields");
    }

    const newPost = await prisma.post.create({
      data: { title, content, authorId },
    });

    return sendResponse(res, 201, true, "Post created successfully", newPost);
  } catch (error: any) {
    console.error("Error creating post:", error);
    return sendResponse(res, 500, false, "Failed to create post");
  }
};

/**
 * @desc   Update an existing post
 * @route  PUT /api/posts/:id
 * @access Public
 */
export const updatePost = async (
  req: Request<
    { id: string },
    {},
    {
      title: string;
      content: string;
    }
  >,
  res: Response
) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });

    return sendResponse(
      res,
      200,
      true,
      "Post updated successfully",
      updatedPost
    );
  } catch (error: any) {
    console.error("Error updating post:", error);
    return sendResponse(res, 500, false, "Failed to update post");
  }
};

/**
 * @desc   Delete a post
 * @route  DELETE /api/posts/:id
 * @access Public
 */
export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const postId = parseInt(req.params.id);

    await prisma.post.delete({
      where: { id: postId },
    });

    return sendResponse(res, 200, true, "Post deleted successfully");
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return sendResponse(res, 500, false, "Failed to delete post");
  }
};
