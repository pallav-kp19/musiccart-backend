import { Router } from "express";
import { addToCart } from "../controllers/cart/addToCart.js";
import { changeQuantity } from "../controllers/cart/changeQuantity.js";
import { removeFromCart } from "../controllers/cart/removeFromCart.js";
import { placeOrder } from "../controllers/cart/placeOrder.js";
import { getCart } from "../controllers/cart/getCart.js";
const router = Router()

router.patch('/addToCart', addToCart)
router.patch("/changeQuantity", changeQuantity)
router.patch("/removeFromCart", removeFromCart)
router.patch("/placeOrder", placeOrder)
router.get("/getCart", getCart)

export default router