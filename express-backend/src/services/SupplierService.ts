import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { Supplier } from "../types/index.js";

class SupplierService {
  /**
   * Asynchronously fetches specified suppplier(s) by their IDs and returns them.
   * If no IDs are provided, returns all supppliers.
   *
   * @returns {Promise<Array<Supplier>>} A promise that resolves to an array of suppliers.
   * @throws {Error} Throws an error if reading or parsing the file fails.
   */
  async fetchSuppliers(supplierIds: number[]): Promise<Array<Supplier>> {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.resolve(__dirname, "../static/suppliers.json");
      const fileContent = await fs.readFile(filePath, "utf8");
      const suppliers: Array<Supplier> = JSON.parse(fileContent);

      if (supplierIds?.length) {
        return suppliers.filter((supplier) =>
          supplierIds.includes(supplier.id)
        );
      }

      return suppliers;
    } catch (error) {
      throw new Error("Failed to fetch suppliers.");
    }
  }
}

export default SupplierService;
