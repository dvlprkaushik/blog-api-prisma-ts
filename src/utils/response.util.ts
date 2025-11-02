import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
