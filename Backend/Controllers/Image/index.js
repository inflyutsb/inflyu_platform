const InfluencersData = require('../../Models/influencer_details');
const fetch = require('node-fetch');
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "ap-south-1",
})

exports.getImageUrls = (req, res) => {
    InfluencersData.find({})
        .select({ username: 1, profile_pic_url_hd: 1, edge_owner_to_timeline_media: 1 })
        .then((response) => {
            response.forEach((item) => {
                uploadFileToS3(item.profile_pic_url_hd, `Images/${item.username}/${item.username}_profile_image.png`, 'socialbox-bckt', item)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_1_ToS3(item?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${item.username}/${item.username}_recent_image.png`, 'socialbox-bckt', item)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_2_ToS3(item.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${item.username}/${item.username}_recent_image.png`, 'socialbox-bckt', item)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_3_ToS3(item.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${item.username}/${item.username}_recent_image.png`, 'socialbox-bckt', item)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
            })
            res.json("success")
        })
}

const uploadFileToS3 = (url, bucket, key, item) => {
    return fetch(url)
        .then((response) => {
            response.buffer().then(data => {
                const params =
                {
                    Bucket: 'socialbox-bckt',
                    Body: data,
                    Key: `Images/${item.username}/${item.username}_profile_image.png`,
                };
                return s3.putObject(params).promise();
            });
        });
}

const uploadRecentPosts_1_ToS3 = (url, bucket, key, item) => {
    return fetch(url)
        .then((response) => {
            response.buffer().then(data => {
                const params =
                {
                    Bucket: 'socialbox-bckt',
                    Body: data,
                    Key: `Images/${item.username}/${item.username}_recent_image_1.png`,
                };
                return s3.putObject(params).promise();
            });
        });
}

const uploadRecentPosts_2_ToS3 = (url, bucket, key, item) => {
    return fetch(url)
        .then((response) => {
            response.buffer().then(data => {
                const params =
                {
                    Bucket: 'socialbox-bckt',
                    Body: data,
                    Key: `Images/${item.username}/${item.username}_recent_image_2.png`,
                };
                return s3.putObject(params).promise();
            });
        });
}

const uploadRecentPosts_3_ToS3 = (url, bucket, key, item) => {
    return fetch(url)
        .then((response) => {
            response.buffer().then(data => {
                const params =
                {
                    Bucket: 'socialbox-bckt',
                    Body: data,
                    Key: `Images/${item.username}/${item.username}_recent_image_3.png`,
                };
                return s3.putObject(params).promise();
            });
        });
}