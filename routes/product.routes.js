import { Router } from "express";
import { getAllProduct } from "../controllers/product/getAllProducts.js";
import { GetProductById } from "../controllers/product/getProductById.js";
const router = Router()

router.get("/getProducts", getAllProduct)
router.get("/getProduct/:id", GetProductById)

export default router