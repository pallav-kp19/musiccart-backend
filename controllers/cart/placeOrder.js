import User from "../../models/userSchema.js";

export const placeOrder = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate
            (
                req.user.userId,
                {
                    $set: {
                        cart: []
                    }
                },
                {
                    new: true
                }
            )
            .populate("cart")
            .select('cart -_id')
        res
            .status(200)
            .json({ message: "Order placed!", result })
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Error Occured!" })
    }
}


