import { Request, Response } from "express";
import SupplierService from "../services/SupplierService.js";
import { handleErrorResponse } from "../helpers/index.js";
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
      const supplierIds = [];
      if (req.params.id) {
        supplierIds.push(Number(req.params.id));
      }
      const suppliers = await supplierService.fetchSuppliers(supplierIds);
      res.status(200).json(suppliers);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  }
}

export default SupplierController;
