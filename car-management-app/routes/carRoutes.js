import express from "express";
import upload from "../multerConfig.js";
import {
  createCar,
  listCars,
  getCar,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

router.post("/", authenticate, upload.array("images", 10), createCar);
router.get("/", authenticate, listCars);
router.get("/:id", authenticate, getCar);
router.put("/:id", authenticate, upload.array("images", 10), updateCar);
router.delete("/:id", authenticate, deleteCar);
export default router;
