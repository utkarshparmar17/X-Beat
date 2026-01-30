import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    tag: { type: String },
    tagline: { type: String },
    heroImage: { type: String },
    images: [{ type: String }],
    brand: { type: String, required: true },
    title: { type: String, required: true },
    info: { type: String },
    category: { type: String, required: true },
    type: { type: String },
    connectivity: { type: String },
    finalPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    ratings: { type: Number },
    rateCount: { type: Number },
    path: { type: String }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
