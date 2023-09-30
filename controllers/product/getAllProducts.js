import Product from "../../models/productSchema.js";

export const getAllProduct = async (req, res) => {
    try {
        const { name, type, brand, priceLow, priceHigh, color, sort } = req.query;

        const query = {
            $and: [
                { name: { $regex: name || '', $options: 'i' } },
                { brand: { $regex: brand || '', $options: 'i' } },
                { type: { $regex: type || '', $options: 'i' } },
                { color: { $regex: color || '', $options: 'i' } },
                {
                    price: {
                        $gte: +priceLow || 0,
                        $lte: +priceHigh || 1000000,
                    }
                },
            ]
        };

        let sortOptions = {};

        if (sort === 'priceAsc') {
            sortOptions = { price: 1 };
        } else if (sort === 'priceDesc') {
            sortOptions = { price: -1 };
        } else if (sort === 'nameAsc') {
            sortOptions = { name: 1 };
        } else if (sort === 'nameDesc') {
            sortOptions = { name: -1 };
        } else {
            sortOptions = { isFeatured: 1 }
        }

        const result = await Product.find(query).sort(sortOptions);
        res.status(200).json({ message: "Fetched Products!", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
