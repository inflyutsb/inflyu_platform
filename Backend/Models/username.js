const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let usernameSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        isVerified: {
            type: Boolean,
        },
        profile_pic_url: {
            type: String,
        },
        media_count: {
            type: Number,
        },
        follower_count: {
            type: Number,
        },
        following_count: {
            type: Number,
        },
        total_igtv_videos: {
            type: Number,
        },
        total_clips_count: {
            type: Number,
        },
        category: {
            type: String,
        },
        city_name: {
            type: String,
        },
        contact_phone_number: {
            type: Number,
        },
        public_phone_country_code: {
            type: Number
        },
        public_email: {
            type: String,
        },
        public_phone_number: {
            type: Number,
        },
        is_business: {
            type: Boolean,
        },
        whatsapp_number: {
            type: Number,
        },
        isFetched: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: "userIdSearchResponse",
    }
);
module.exports = mongoose.model("Username", usernameSchema);