import { Router } from "express";
import { getAllProduct } from "../controllers/product/getAllProducts.js";
const router = Router()

router.get("/getProducts", getAllProduct)

export default router