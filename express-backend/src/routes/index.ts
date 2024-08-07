import express from "express";
import ActivityController from "../controllers/ActivityController.js";
import SupplierController from "../controllers/SupplierController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is up and running...");
});

router.get("/activities", ActivityController.fetchActivities);
router.get("/suppliers", SupplierController.fetchSuppliers);

export default router;
