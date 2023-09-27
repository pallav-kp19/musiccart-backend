import User from "../../models/userSchema.js";
export const addToCart = async (req, res) => {

    try {
        const { userId } = req.user
        const { productId } = req.query
        const user = await User.findOne({ _id: userId })
        const isProductInCart = user.cart.some(item => item.product.toString() === productId);
        if (isProductInCart) return res.status(400).json({ message: "Item already in cart!" })
        const result = await User.findByIdAndUpdate(userId, {
            $addToSet: {
                cart: { product: productId, quantity: 1 }
            }
        },
            { new: true }
        )
            .populate('cart.product').select('cart -_id')
        res.status(200).json({ message: "Added to Cart", result })
    } catch (error) {
        res.status(500).json({ message: "Inernal Error Occured!" })
    }
}