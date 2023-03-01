const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let profileDataSchema = new Schema(
    {
        profile_pic_url_hd: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        full_name: {
            type: String,
        },
        is_verified: {
            type: Boolean,
        },
        external_url: {
            type: String,
        },
        edge_followed_by: {
            type: Object,
        },
        edge_follow: {
            type: Object,
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
        public_email: {
            type: String,
        },
        public_phone_number: {
            type: Number,
        },
        is_business_account: {
            type: Boolean,
        },
        whatsapp_number: {
            type: Number,
        },
        business_contact_method: {
            type: String,
        },
        business_email: {
            type: String,
        },
        business_phone_number: {
            type: String,
        },
        business_category_name: {
            type: String,
        },
        overall_category_name: {
            type: String,
        },
        category_enum: {
            type: String,
        },
        edge_felix_video_timeline: {
            type: Object,
        },
        edge_owner_to_timeline_media: {
            type: Object,
        },
        edge_saved_media: {
            type: Object,
        },
        edge_media_collections: {
            type: Object,
        },
        isAdded: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: "usernameSearchResponse",
    }
);
module.exports = mongoose.model("ProfileData", profileDataSchema);