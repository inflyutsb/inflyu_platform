const InfluencersData = require('../Models/influencer_details');
const CsvParser = require("json2csv").Parser;
exports.downloadcsv = (req, res, next) => {
  let { inputField } = req.query;
  let search = {};
  if (inputField != null) {
    search = { $or: [{ full_name: { $regex: inputField, $options: 'i' } }, { username: { $regex: inputField, $options: 'i' } }, { category_enum: { $regex: inputField, $options: 'i' } }] }
  }
  InfluencersData.find(search)
    // .select({ username: 1, _id: 0, edge_followed_by: 1, edge_owner_to_timeline_media: 1, edge_felix_video_timeline: 1, city_name: 1, category_enum: 1 })
    .then((objs) => {
      let data = [];

      objs.forEach((obj) => {
        const Followers = obj.edge_followed_by.count || "-";
        const EngagementRate = obj.edge_owner_to_timeline_media.edges[0].er || "-";
        const avg_likes = obj.edge_owner_to_timeline_media.edges[0].avg_likes || "-";
        const avg_comment = obj.edge_owner_to_timeline_media.edges[0].avg_comment || "-";
        const avg_reach = obj.edge_felix_video_timeline.edges[0].averageReelView || "-";
        const city_name = obj.city_name || "null";
        const category_enum = obj.category_enum || "null";
        const { username } = obj;
        data.push({ username, Followers, EngagementRate, avg_likes, avg_comment, avg_reach, city_name, category_enum });
      });

      const csvParser = new CsvParser();
      const csvData = csvParser.parse(data);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=info.csv");

      res.status(200).end(csvData);
    });
}