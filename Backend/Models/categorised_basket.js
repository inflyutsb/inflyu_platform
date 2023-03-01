const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categorisedBasketSchema = new Schema(
    {
        categoryName: {
            type: String,
            unique: true,
        },
        basketInfluencersCount: {
            type: Number,
        },
        basket: {
            type: Array,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
        collection: "Categorized_Baskets",
    }
);
module.exports = mongoose.model("CategorizedBasket", categorisedBasketSchema);
