import User from "../../models/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        if (!name || !password || !email || !phone) {
            return res
                .status(400)
                .json({ message: "Invalid input data" });
        }

        const foundUser = await User.findOne({
            $or: [
                { phone },
                { email }
            ]
        });
        if (foundUser) {
            return res
                .status(400)
                .json({ message: "User with same phone/email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ name, password: hashedPassword, email, phone });

        const token = jwt.sign({ userId: newUser._id, username: newUser.name }, process.env.ACCESS_SECRET, { expiresIn: '10s' });

        const refreshToken = jwt.sign({ userId: newUser._id, username: newUser.name }, process.env.REFRESH_SECRET, { expiresIn: '1d' });

        await User.findByIdAndUpdate(newUser._id, { $push: { refreshToken } });

        res.cookie('jwt', refreshToken, { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' });

        return res.status(201).json({ message: "Registered Successfully!", token, user: { username: newUser.name, _id: newUser._id } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};