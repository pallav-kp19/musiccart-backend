import Product from "../../models/productSchema.js";

export const getAllProduct = async (req, res) => {
    try {
        const { name, type, brand, priceLow, priceHigh, color } = req.query
        const result = await Product.find({
            $and: [
                { name: { $regex: name || '', $options: 'i' } },
                { brand: { $regex: brand || '', $options: 'i' } },
                { type: { $regex: type || '', $options: 'i' } },
                { color: { $regex: color || '', $options: 'i' } },
                {
                    $or: [
                        {
                            price: {
                                $gte: priceHigh,
                                $lte: priceLow,
                            }
                        },
                        {
                            price: {
                                $exists: true
                            }
                        }
                    ]
                }
            ]
        })
        res.status(200).json({ message: "Fetched Products!", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
