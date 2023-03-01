const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userinfoSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true, unique: true, sparse: true,
    },
    password: {
      type: String,

      minlength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superAdmin"],
    },
    token: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 1,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedInProfile: {
      type: String,
      trim: true,
    },
    list: [{
      listName: String,
      deliverables: Array,
      description: String,
      influencersData: Array,
      deletedInfluencers: Array,
      createdAT: { type: Date, default: Date.now(), index: { expiresIn: 300 } }
    }],
    lastListAdded: {
      type: String,
    },
    date: {
      type: Date,
    },
    image: {
      type: String,
    },
    otp: {
      type: String,
    },
    building: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    locality: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pin: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    website: {
      type: String
    },
    facebookProfile: {
      type: String,
      trim: true,
    },
    instagramProfile: {
      type: String,
      trim: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now(), index: { expiresIn: 300 } },
    source: { type: String },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
module.exports = mongoose.model("UserInfo", userinfoSchema);
