const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        quantity: {
            type: Number
        },
        user_id :{
            type:ObjectId,
            ref:'User',
            required:true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);