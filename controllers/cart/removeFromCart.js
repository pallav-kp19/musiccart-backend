import User from "../../models/userSchema.js";
export const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.user
        const { productId } = req.query
        const result = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    cart: { product: productId },
                },
            },
            { new: true }
        )
            .populate('cart.product')
            .select('cart -_id cartTotalAmount')
        res.status(200).json({ message: "Item removed from  Cart", result })
    } catch (error) {
        res.status(500).json({ message: "Inernal Error Occured!" })
    }
}