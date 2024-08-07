import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { Supplier } from "../../../shared/types/index.js";
import { SupplierModel } from "../models/SupplierModel.js";

class SupplierService {
  /**
   * Asynchronously fetches specified suppplier(s) by their IDs and returns them.
   * If no IDs are provided, returns all supppliers.
   *
   * @returns {Promise<Array<Supplier>>} A promise that resolves to an array of suppliers.
   * @throws {Error} Throws an error if reading or parsing the file fails.
   */
  async fetchSuppliers(supplierIds: string[]): Promise<Array<Supplier>> {
    try {
      // Check if supplierIds array is not empty
      if (supplierIds?.length) {
        // // Fetch suppliers whose _id is in the supplierIds array
        return (await SupplierModel.find({
          _id: { $in: supplierIds },
        })) as Supplier[];
      }
      // If no supplierIds are provided, fetch all suppliers
      const suppliers: Array<Supplier> = (await SupplierModel.find(
        {}
      )) as Supplier[];

      return suppliers;
    } catch (error) {
      throw new Error("Failed to fetch suppliers.");
    }
  }
}

export default SupplierService;
