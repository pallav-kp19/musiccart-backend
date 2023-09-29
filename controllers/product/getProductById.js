import Product from "../../models/productSchema.js";
export const GetProductById = async (req, res) => {
    try {
        const result = await Product.findById(req.query.id)
        res.status(200).json({ message: "Fetched Product!", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}