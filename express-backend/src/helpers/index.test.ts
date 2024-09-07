import {
  handleErrorResponse,
  commaSeparatedStringToArray,
  createJSONResponse,
} from "./index.js";
import { Response } from "express";
import { ErrorResponse, Pagination } from "../../../shared/types/index.js";

describe("Helper Functions", () => {
  describe("handleErrorResponse", () => {
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should handle Error instance", () => {
      const error = new Error("Test error");
      handleErrorResponse(error, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "An unexpected error occurred",
        error: "Test error",
      });
    });

    it("should handle unknown error", () => {
      handleErrorResponse("Unknown error", mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "An unexpected error occurred",
      });
    });

    it("should use custom status code", () => {
      handleErrorResponse("Custom error", mockResponse as Response, 400);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe("commaSeparatedStringToArray", () => {
    it("should convert comma-separated string to array", () => {
      expect(commaSeparatedStringToArray("a,b,c")).toEqual(["a", "b", "c"]);
    });

    it("should return empty array for undefined input", () => {
      expect(commaSeparatedStringToArray(undefined)).toEqual([]);
    });

    it("should return array as is", () => {
      expect(commaSeparatedStringToArray(["a", "b", "c"])).toEqual([
        "a",
        "b",
        "c",
      ]);
    });
  });

  describe("createJSONResponse", () => {
    it("should create JSON response with result", () => {
      const result = { id: 1, name: "Test" };
      expect(createJSONResponse(result)).toEqual({
        result,
        metadata: {
          timestamp: expect.any(String),
        },
      });
    });

    it("should include pagination in metadata", () => {
      const result = { id: 1, name: "Test" };
      const pagination: Pagination = { currentPage: 1, totalPages: 5 };
      expect(createJSONResponse(result, pagination)).toEqual({
        result,
        metadata: {
          timestamp: expect.any(String),
          pagination,
        },
      });
    });
  });
});
