import { Request, Response } from "express";
import { prisma } from "../config/prisma.config.js";

/**
 * @desc    Create a new user
 * @route   POST /api/users
 */
export const createUser = async (
  req: Request<{}, {}, { email: string; name: string }>,
  res: Response
) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required." });
  }

  try {
    const user = await prisma.user.create({
      data: { email, name },
    });

    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already exists." });
    }
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * @desc    Get user by ID (with posts)
 * @route   GET /api/users/:id
 */
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID." });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};
