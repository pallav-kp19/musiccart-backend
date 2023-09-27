import Product from "../../models/productSchema.js";

export const addProduct = async (req, res) => {
    try {
        const result = await Product.insertMany(req.body.products)
        res.status(200)
            .json({ message: "Products Added!", result })
    } catch (error) {
        res
            .status(500)
            .json({ messsage: "Internal Server Error!" })
    }
}