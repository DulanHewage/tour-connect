import connectDB from "../db/index.js";
import { ActivityModel } from "../models/ActivityModel.js";
import { SupplierModel, ISupplier } from "../models/SupplierModel.js";
import mongoose from "mongoose";
import { getActivitiesData, getSuppliersData } from "./getDummyData.js";
import { ObjectId } from "mongoose";

(async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();
    await ActivityModel.deleteMany({});
    console.log("All documents deleted");

    console.log("Seeding database...");

    // get the suppliers data
    const suppliers = await getSuppliersData();
    // Insert the suppliers data
    const insertedSuppliers: ISupplier[] =
      await SupplierModel.insertMany(suppliers);
    // get all the supplierIds from the inserted suppliers
    const supplierIds: ObjectId[] = insertedSuppliers.map(
      (supplier) => supplier._id as ObjectId
    );
    // Get the activities data
    const activities = await getActivitiesData();
    const activitiesWithSupplierId = activities.map(({ _id, ...rest }) => {
      // Assign a supplierId from the list of supplier IDs
      const supplierId =
        supplierIds[Math.floor(Math.random() * supplierIds.length)];
      return {
        ...rest,
        supplierId: supplierId,
      };
    });
    // Insert the activities data
    await ActivityModel.insertMany(activitiesWithSupplierId);

    console.log("Database seeded");
  } catch (err: any) {
    console.error(err.message);
  }

  mongoose.connection.close();
  process.exit();
})();
