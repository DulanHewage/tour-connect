import { Request, Response } from "express";
import SupplierService from "../services/SupplierService.js";
import {
  handleErrorResponse,
  commaSeperatedStringToArray,
} from "../helpers/index.js";
const supplierService = new SupplierService();

class SupplierController {
  /**
   * Fetches and returns suppliers based on the provided ID in the request parameters.
   * If no ID is provided, returns all suppliers.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves with no value.
   */
  static async fetchSuppliers(req: Request, res: Response): Promise<void> {
    try {
      // Initialize an empty array to hold supplier IDs
      let supplierIds: string[] = [];
      // Check if supplierIds query parameter is a string
      if (typeof req.query.supplierIds === "string") {
        // Convert the comma-separated string to an array of supplier IDs
        supplierIds = commaSeperatedStringToArray(req.query.supplierIds);
      }
      // Fetch suppliers using the supplierService with the provided supplier IDs
      const suppliers = await supplierService.fetchSuppliers(supplierIds);
      // Send the fetched suppliers as a JSON response with status 200
      res.status(200).json(suppliers);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  }
}

export default SupplierController;
