const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let usernamecsvSchema = new Schema(
    {
        username: {
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
        collection: "csvUsernameResponse",
    }
);
module.exports = mongoose.model("UsernameCsv", usernamecsvSchema);