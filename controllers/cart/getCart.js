import User from "../../models/userSchema.js";
export const getCart = async (req, res) => {
    try {
        const { userId } = req.user
        const result = await User.findById(userId).select('cart -_id')
            .populate('cart')
        res.status(200).json({ message: "cart fetched", result })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}