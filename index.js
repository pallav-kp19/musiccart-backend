import { Router } from "express";
const router = Router()
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"

import tokenValidator from "./middlewares/verifyToken.js";
router.use("/product", productRoutes)
router.use("/cart", tokenValidator, cartRoutes)

export default router