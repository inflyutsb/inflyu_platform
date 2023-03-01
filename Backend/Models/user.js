const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    ownerID: {
      type: String,
      unique: true,
    },
    isFetched: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: "hashtagresponse",
  }
);
module.exports = mongoose.model("User", userSchema);
