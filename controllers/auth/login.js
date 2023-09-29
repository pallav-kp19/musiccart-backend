import User from "../../models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config()
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let isNumber = +username
        if (typeof (isNumber) != 'number') isNumber = undefined
        const user = await User
            .findOne({
                $or: [
                    { email: username },
                    { phone: isNumber || '' }
                ]
            })
            .select('username _id password refreshToken')
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User not found' });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res
                .status(400)
                .json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user?.name
            },
            process.env.ACCESS_SECRET,
            { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
            {
                userId: user._id,
                username: user?.name
            },
            process.env.REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        try {
            await User
                .findByIdAndUpdate(user._id, { $addToSet: { refreshToken } });
            res.cookie('jwt',
                refreshToken,
                {
                    secure: true,
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'None'
                }
            );
            return res
                .status(200)
                .json({
                    message: 'Login successful',
                    token,
                    user: { _id: user._id, username }
                });
        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ message: "Internal Server Error!" });
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Internal Error!" });
    }
}