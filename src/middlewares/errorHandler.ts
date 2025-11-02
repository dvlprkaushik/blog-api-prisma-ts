import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { sendResponse } from "../utils/response.util";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  console.error("Global Error:", err);

  // Handle Prisma-specific errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return sendResponse(res, 409, false, "Duplicate field value (unique constraint failed)");
      case "P2003":
        return sendResponse(res, 400, false, "Invalid reference (foreign key constraint failed)");
      case "P2025":
        return sendResponse(res, 404, false, "Record not found");
      default:
        return sendResponse(res, 500, false, "Database operation failed");
    }
  }

  // Handle general errors
  if (err instanceof Error) {
    return sendResponse(res, 500, false, err.message || "Internal server error");
  }

  // Unknown error fallback
  return sendResponse(res, 500, false, "Something went wrong");
};
