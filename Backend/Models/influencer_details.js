const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let influencersDataSchema = new Schema(
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
        costFactorReel: {
            minCostPer1kFollowersForReel: Number,
            maxCostper1KFollowersForReel: Number,
            minCostPerLikeForReel: Number,
            maxCostperLikeForReel: Number,
            minCostPerCommentForReel: Number,
            maxCostperCommentForReel: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        costFactorPosts: {
            minCostPer1kFollowersForPosts: Number,
            maxCostper1KFollowersForPosts: Number,
            minCostPerLikeForPosts: Number,
            maxCostperLikeForPosts: Number,
            minCostPerCommentForPosts: Number,
            maxCostperCommentForPosts: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        costFactorStories: {
            minCostPer1kFollowersForStory: Number,
            maxCostper1KFollowersForStory: Number,
            minCostPerLikeForStory: Number,
            maxCostperLikeForStory: Number,
            minCostPerCommentForStory: Number,
            maxCostperCommentForStory: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        costFactorIgtv: {
            minCostPer1kFollowersForIgtv: Number,
            maxCostper1KFollowersForIgtv: Number,
            minCostPerLikeForIgtv: Number,
            maxCostperLikeForIgtv: Number,
            minCostPerCommentForIgtv: Number,
            maxCostperCommentForIgtv: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        costFactorSwipeUp: {
            minCostPer1kFollowersForSwipeUpStory: Number,
            maxCostper1KFollowersForSwipeUpStory: Number,
            minCostPerLikeForSwipeUpStory: Number,
            maxCostperLikeForSwipeUpStory: Number,
            minCostPerCommentForSwipeUpStory: Number,
            maxCostperCommentForSwipeUpStory: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        costFactorVideo: {
            minCostPer1kFollowersForVideo: Number,
            maxCostper1KFollowersForVideo: Number,
            minCostPerLikeForVideo: Number,
            maxCostperLikeForVideo: Number,
            minCostPerCommentForVideo: Number,
            maxCostperCommentForVideo: Number,
            minTotalCost: Number,
            maxTotalCost: Number,
            influencerExactminTotalCost: Number,
            influencerExactmaxTotalCost: Number,
        },
        final_category: {
            type: String,
        },
        contact: {
            type: String,
        },
        final_email: {
            type: String,
        },
        dob: {
            type: String,
        },
        gender: {
            type: String,
        },
        final_city: {
            type: String,
        }
    },
    {
        timestamps: true,
        collection: "InfluencersData",
    }
);
module.exports = mongoose.model("InfluencersData", influencersDataSchema);