import express from "express";
import ActivityController from "../controllers/ActivityController.js";
import SupplierController from "../controllers/SupplierController.js";

const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.send("Server is up and running...");
});

// API v1 routes
const v1Router = express.Router();

v1Router.get("/activities", ActivityController.fetchActivities);
v1Router.get("/suppliers", SupplierController.fetchSuppliers);
v1Router.get("/activities/stats", ActivityController.getActivityStats);

// Mount v1 routes under /api/v1
router.use("/api/v1", v1Router);

export default router;
