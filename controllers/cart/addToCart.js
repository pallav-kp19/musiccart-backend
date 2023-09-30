import User from "../../models/userSchema.js";
export const addToCart = async (req, res) => {

    try {
        const { userId } = req.user
        const { productId } = req.query
        const result = await User.findByIdAndUpdate(userId, {
            $push: {
                cart: productId
            }
        },
            { new: true }
        ).select('cart -_id').populate('cart')
        res.status(200).json({ message: "Added to Cart", result })
    } catch (error) {
        res.status(500).json({ message: "Inernal Error Occured!" })
    }
}