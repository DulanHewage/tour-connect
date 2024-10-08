import { Response } from "express";
import {
  ErrorResponse,
  JSONResponse,
  Pagination,
} from "../../../shared/types/index.js";

/**
 * Handles error responses for routes.
 *
 * @param {unknown} error - The error object caught in the catch block.
 * @param {Response} res - The Express response object used to send the response.
 * @param {number} [statusCode=500] - The HTTP status code to send with the response. Defaults to 500.
 */
export function handleErrorResponse(
  error: unknown,
  res: Response,
  statusCode: number = 500
): void {
  const defaultErrorMessage = "An unexpected error occurred";
  let errorMessage: string;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = defaultErrorMessage;
  }

  const errorResponse: ErrorResponse = {
    message: defaultErrorMessage,
    error: errorMessage !== defaultErrorMessage ? errorMessage : undefined,
  };

  res.status(statusCode).json(errorResponse);
}

export function commaSeparatedStringToArray(
  commaSeperatedString: string | string[] | undefined
): string[] {
  if (Array.isArray(commaSeperatedString)) {
    return commaSeperatedString.map((s) => s);
  } else if (commaSeperatedString) {
    return commaSeperatedString.split(",").map((s) => s);
  }
  return [];
}

export function createJSONResponse(
  result: any,
  pagination?: Pagination
): JSONResponse<any> {
  return {
    result,
    metadata: {
      timestamp: new Date().toISOString(),
      ...(pagination && { pagination }),
    },
  };
}
