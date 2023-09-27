import User from "../../models/userSchema.js";
export const getCart = async (req, res) => {
    try {
        const { userId } = req.user
        const result = await User.findById(userId)
            .populate("cart.product")
            .select('cart -_id')
        res.status(200).json({ message: "cart fetched", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}