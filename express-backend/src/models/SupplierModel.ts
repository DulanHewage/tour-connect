import { Schema, model, Document } from "mongoose";
import { Supplier } from "../../../shared/types/index.js"; // Adjust the import path as needed

// Extend the interfaces to include Mongoose Document properties
interface ISupplier extends Omit<Supplier, "_id">, Document {}

// Define the Supplier schema
const supplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// Create the models
const SupplierModel = model<ISupplier>("Supplier", supplierSchema);

export { SupplierModel, ISupplier };
