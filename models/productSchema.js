import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: String,
    type: String,
    brand: String,
    color: String,
    isFeatured: Boolean,
    isAvailable: Boolean,
    longDescription: String,
    price: Number,
    rating: Number,
    reviews: Number,
    images: [String],
    about: [String]

}, { timestamps: true })

export default model('Product', productSchema)