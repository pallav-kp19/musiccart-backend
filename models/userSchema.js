import { Schema, Types, model } from "mongoose";
const userSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    refreshToken: {
        type: [String]
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [Types.ObjectId],
        ref: 'Product'
    },
}, {
    timestamps: true,
})

export default model('User', userSchema)