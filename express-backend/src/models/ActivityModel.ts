import { Schema, model, Document, Types } from "mongoose";
import { Activity } from "../../../shared/types/index.js"; // Adjust the import path as needed

// Extend the interfaces to include Mongoose Document properties
interface IActivity extends Omit<Activity, "_id" | "supplierId">, Document {
  supplierId?: Types.ObjectId;
}
// Define the Activity schema
const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  rating: { type: Number, required: true },
  specialOffer: { type: Boolean, required: false, default: false },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
});

// Create the models
const ActivityModel = model<IActivity>("Activity", activitySchema);

export { ActivityModel };
