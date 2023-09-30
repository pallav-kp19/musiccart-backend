import User from "../../models/userSchema.js";
export const changeQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.query
        const { userId } = req.user
        const result = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'cart.$[elem].quantity': +quantity,
                },
            },
            {
                arrayFilters: [{ 'elem.product': productId }],
                new: true,
            }
        )
            .populate('cart.product')
            .select('cart -_id cartTotalAmount')
        res.status(200).json({ message: "Quantity Changed", result })
            ;
    } catch (error) {
        res.status(500).json({ message: "Inernal Error Occured!" })
    }
}