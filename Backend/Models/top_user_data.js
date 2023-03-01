const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let profileDataSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: "usernameSearchResponse",
    }
);
module.exports = mongoose.model("ProfileData", profileDataSchema);