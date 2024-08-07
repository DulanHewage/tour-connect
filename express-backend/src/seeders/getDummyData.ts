import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { Activity, Supplier } from "../../../shared/types/index.js";

async function getActivitiesData() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "../static/activities.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  const activities: Array<Activity> = JSON.parse(fileContent);
  return activities;
}

async function getSuppliersData() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "../static/suppliers.json");
  const fileContent = await fs.readFile(filePath, "utf8");
  const suppliers: Array<Supplier> = JSON.parse(fileContent);
  return suppliers;
}

export { getActivitiesData, getSuppliersData };
