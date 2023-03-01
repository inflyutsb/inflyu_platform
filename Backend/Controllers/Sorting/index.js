const InfluencersData = require('../../Models/influencer_details');

exports.filterUsers = (req, res) => {
    let { username } = req.query;
    let filter = {};
    if (username != null) {
        filter = { $or: [{ full_name: { $regex: username, $options: 'i' } }, { username: { $regex: username, $options: 'i' } }, { category_enum: { $regex: username, $options: 'i' } }] }
    }
    InfluencersData.find(filter)
        .select({ username: 1, _id: 0 })
        .then((data) => {
            res.json(data)
        })
}

exports.getProfileOfInfluencer = (req, res) => {
    let { inputField } = req.query;

    InfluencersData.findOne({ username: inputField })
        .select({ username: 1, _id: 0, edge_followed_by: 1, city_name: 1, category_enum: 1, full_name: 1, profile_pic_url_hd: 1, edge_felix_video_timeline: 1, edge_owner_to_timeline_media: 1, final_category: 1, final_city: 1 })
        .then((data) => {
            res.json([data])
        })
}