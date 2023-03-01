const fetch = require('node-fetch');
const User = require('../Models/user');
const Username = require('../Models/username');
const ProfileData = require('../Models/profile_data');
const InfluencersData = require('../Models/influencer_details');
const UserInfo = require('../Models/user_info');
const Testing = require('../Models/testing')
const axios = require('axios');
const proxyArray = require('../utils/proxiesArray');
const HttpsProxyAgent = require('https-proxy-agent');
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "ap-south-1",
})

const URLENCODED_HEADER = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/ 605.1.15(KHTML, like Gecko) Mobile / 15E148 Instagram 105.0.0.11.118(iPhone11, 8; iOS 12_3_1; en_US; en - US; scale = 2.00; 828x1792; 165586599)',
    // 'Cookie': 'sessionid=55174935431:oUkeyOkjSTHOai:11:AYcCQRGAQW0_XSTcjaz7XHUgRoXj6weyCzi_8MCzew'
}
const TAG_API_HEADER = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/ 605.1.15(KHTML, like Gecko) Mobile / 15E148 Instagram 105.0.0.11.118(iPhone11, 8; iOS 12_3_1; en_US; en - US; scale = 2.00; 828x1792; 165586599)',
}

const random_number = Math.floor(Math.random() * 10);

exports.hashtag = (req, res, next) => {
    let max_id = '';
    let second_url = '';
    let id_array = [];
    let { tagname } = req.query;
    let finalResult = [];
    const url = `https://i.instagram.com/api/v1/tags/logged_out_web_info/?tag_name=${tagname}`;
    const fetchuntilEnd_cursor_empty = (second_url) => {
        fetch(second_url, {
            method: 'GET',
            headers: TAG_API_HEADER,
            mode: 'cors'
        }).then((response) => response.json())
            .then((data) => {
                let ids = data['data']['hashtag']['edge_hashtag_to_media']['edges'];
                ids.forEach(element => {
                    if (element.node.edge_liked_by.count > 500) {
                        id_array.push({ ownerID: element.node.owner.id })
                    }
                })
                User.insertMany(id_array)
                    .then((result) => {
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                if (data['data']['hashtag']['edge_hashtag_to_media']['page_info'].has_next_page === true) {
                    max_id = data['data']['hashtag']['edge_hashtag_to_media']['page_info'].end_cursor;
                    let url_change = `https://i.instagram.com/api/v1/tags/logged_out_web_info/?tag_name=${tagname}&max_id=${max_id}`;
                    fetchuntilEnd_cursor_empty(url_change);
                }
                else {
                    res.json('success')
                }
                ids = id_array = [];
            })
    }
    fetch(url, {
        method: 'GET',
        headers: TAG_API_HEADER,
        mode: 'cors'
    }).then((response) => response.json())
        .then((data) => {
            let abc = data['data']['hashtag']['edge_hashtag_to_media']['edges'];
            let arr = [];
            abc.forEach(element => {
                if (element.node.edge_liked_by.count > 150) {
                    arr.push({ ownerID: element.node.owner.id });
                }
            });
            User.insertMany(arr)
                .then((result) => {
                })
                .catch((err) => {
                    console.log(err)
                })
            if (data['data']['hashtag']['edge_hashtag_to_media']['page_info'].has_next_page === true) {
                max_id = data['data']['hashtag']['edge_hashtag_to_media']['page_info'].end_cursor;
                second_url = `https://i.instagram.com/api/v1/tags/logged_out_web_info/?tag_name=${tagname}&max_id=${max_id}`;
                fetchuntilEnd_cursor_empty(second_url);
            }
            else {
                res.json('success')
            }
            abc = arr = [];
        });
}

// exports.topsearch = async (req, res, next) => {
//     let { query } = req.body;
//     const url = `https://www.instagram.com/web/search/topsearch?query=${query}`;
//     axios.get(url, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/ 605.1.15(KHTML, like Gecko) Mobile / 15E148 Instagram 105.0.0.11.118(iPhone11, 8; iOS 12_3_1; en_US; en - US; scale = 2.00; 828x1792; 165586599)',
//             'Cookie': 'sessionid=55174935431:oUkeyOkjSTHOai:11:AYcCQRGAQW0_XSTcjaz7XHUgRoXj6weyCzi_8MCzew',
//             // 'Cookie': 'sessionid=4254722113:8jQkarLtt6Z1wj:27:AYdZDexKTjHFIqPlMKx-vfND1fPhT1vP3FfU8Fii1g',   //working
//             // 'Cookie': 'sessionid=1606001920:gScv2hwUIuRb82:21:AYevLdDnNu06Sv5fsj-r-Pm5NYjUL8ZNfHSGrPv3UQ',
//         },
//     }).then((res) => {
//         // res.json()
//         console.log(response)
//     })
//     // .then((data) => res.json(data));

// }

// exports.userID = (req, res, next) => {
//     const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
//     let arr = [];
//     User.find({})
//         .then((response) => {
//             response.forEach((item) => {
//                 arr.push(item.ownerID)
//             })
//             arr.forEach((item) => {
//                 const url = `https://i.instagram.com/api/v1/users/${item}/info/`;
//                 fetch(url, {
//                     method: 'GET',
//                     agent: proxyAgent,
//                     headers: URLENCODED_HEADER,
//                     mode: 'cors'
//                 }).then((response) => response.json()
//                     .then((data) => {
//                         if (data.user) {
//                             Username.insertMany([data.user])
//                                 .then((result) => {
//                                     // res.status(200).json({
//                                     //     success: 'true',
//                                     //     data: result
//                                     // })
//                                 })
//                                 .catch((err) => {
//                                     console.log(err)
//                                 })
//                         }
//                     })
//                 )
//             })
//             res.json('Fetching')
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

exports.userID = (req, res, next) => {
    let fetchedLength = 0;
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    User.find({})
        .then((response) => {
            response.forEach((item) => {
                if (item.isFetched === false) {
                    const url = `https://i.instagram.com/api/v1/users/${item.ownerID}/info/`;
                    fetch(url, {
                        method: 'GET',
                        agent: proxyAgent,
                        headers: URLENCODED_HEADER,
                        mode: 'cors',
                    }).then((response) => response.json()
                        .then((data) => {
                            if (data.user) {
                                item.isFetched = true;
                                item.save();
                                Username.insertMany([data.user])
                                    .then((result) => {
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                    )
                }
            })
            User.find({ isFetched: true })
                .then((fetchedData) => {
                    res.json(`items added ${fetchedData.length} - ${response.length}`)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}


exports.profile = (req, res, next) => {
    let avg_like = 0;
    let avg_comment = 0;
    let engagementRate = 0;
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    Username.find()
        .then((response) => {
            let arr = [];
            response.forEach((item) => {
                if (item.isFetched === false) {
                    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${item.username}`;
                    fetch(url,
                        {
                            method: 'GET',
                            agent: proxyAgent,
                            headers: URLENCODED_HEADER,
                            mode: 'cors',
                        }
                    )
                        .then((response) => {
                            response.json()
                                .then((data) => {
                                    if (data.data.user) {
                                        item.isFetched = true;
                                        item.save()
                                        avg_like = 0;
                                        avg_comment = 0;
                                        engagementRate = 0;
                                        let edges = data.data.user?.edge_owner_to_timeline_media?.edges;
                                        edges.forEach((item) => {
                                            avg_like += Math.trunc(item?.node?.edge_liked_by.count / 12);
                                            avg_comment += Math.trunc(item?.node?.edge_media_to_comment?.count / 12);
                                            engagementRate = ((avg_like + avg_comment) / data.data.user?.edge_followed_by?.count) * 100;
                                            // engagementRate = Number(engagementRate.toFixed(2))
                                            engagementRate = engagementRate.toString();
                                            engagementRate = engagementRate.slice(0, (engagementRate.indexOf(".")) + 2 + 1);
                                            engagementRate = Number(engagementRate);
                                        })
                                        if (engagementRate >= 5 && avg_like > 5000) {
                                            uploadFileToS3(data.data.user?.profile_pic_url_hd, `Images/${data.data.user?.username}/${data.data.user?.username}_profile_image.png`, 'socialbox-bckt', data.data.user)
                                                .then((data) => {
                                                    console.log("File saved!")
                                                })
                                                .catch((error) => console.log(error));
                                            uploadRecentPosts_1_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_1.png`, 'socialbox-bckt', data.data.user)
                                                .then((data) => {
                                                    console.log("File saved!")
                                                })
                                                .catch((error) => console.log(error));
                                            uploadRecentPosts_2_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_2.png`, 'socialbox-bckt', data.data.user)
                                                .then((data) => {
                                                    console.log("File saved!")
                                                })
                                                .catch((error) => console.log(error));
                                            uploadRecentPosts_3_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_3.png`, 'socialbox-bckt', data.data.user)
                                                .then((data) => {
                                                    console.log("File saved!")
                                                })
                                                .catch((error) => console.log(error));
                                            ProfileData.findOne({ username: data.data.user.username })
                                                .then((item) => {
                                                    if (item) {
                                                        item.edge_followed_by = data.data.user?.edge_followed_by,
                                                            item.full_name = data.data.user?.full_name,
                                                            item.is_verified = data.data.user?.is_verified,
                                                            item.external_url = data.data.user?.external_url,
                                                            item.edge_follow = data.data.user?.edge_follow,
                                                            item.category_enum = data.data.user?.category_enum,
                                                            item.edge_felix_video_timeline = data.data.user?.edge_felix_video_timeline,
                                                            item.edge_owner_to_timeline_media = data.data.user?.edge_owner_to_timeline_media,
                                                            item.edge_media_collections = data.data.user?.edge_media_collections,
                                                            item.save()
                                                                .then((response) => {
                                                                    if (response) {
                                                                        console.log('Edited');
                                                                    }
                                                                })
                                                    }
                                                    else {
                                                        ProfileData.insertMany([data.data.user])
                                                            .then((result) => {
                                                            })
                                                            .catch((err) => {
                                                                console.log(err)
                                                            })
                                                    }
                                                })
                                        }
                                    }
                                })
                        })
                }
            })
            // }
            Username.find({ isFetched: true })
                .then((fetchedData) => {
                    res.json(`items added ${fetchedData.length} - ${response.length}`)
                })
        })
        .catch((err) => {
            console.log(err)
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
                    Key: `Images/${item?.username}/${item?.username}_profile_image.png`,
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
                    Key: `Images/${item?.username}/${item?.username}_recent_image_1.png`,
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
                    Key: `Images/${item?.username}/${item?.username}_recent_image_2.png`,
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
                    Key: `Images/${item?.username}/${item?.username}_recent_image_3.png`,
                };
                return s3.putObject(params).promise();
            });
        });
}

exports.getInfluencersDetails = (req, res) => {
    let avg_likes = 0;
    let avg_comment = 0;
    let engagementRate = 0;
    let noOfPosts = [];
    let array = [];
    let city_name = '';
    let totalReelView = 0;
    let averageReelView = 0;
    ProfileData.find()
        .select({
            username: 1, full_name: 1, is_verified: 1, edge_followed_by: 1, edge_follow: 1, category_enum: 1,
            'edge_owner_to_timeline_media.edges.node.edge_liked_by': 1,
            'edge_owner_to_timeline_media.edges.node.edge_media_to_comment': 1,
            'edge_owner_to_timeline_media.count': 1,
            'edge_owner_to_timeline_media.edges.node.video_view_count': 1,
            'edge_owner_to_timeline_media.edges.node.taken_at_timestamp': 1,
            'edge_felix_video_timeline.edges.node.edge_liked_by': 1,
            'edge_felix_video_timeline.edges.node.edge_media_to_comment': 1,
            'edge_felix_video_timeline.edges.node.video_view_count': 1,
            'edge_felix_video_timeline.count': 1,
            'edge_felix_video_timeline.edges.node.taken_at_timestamp': 1,
            external_url: 1,
            isAdded: 1,
        })
        .then((result) => {
            result.forEach((data) => {
                if (data.isAdded === false) {
                    totalReelView = 0;
                    averageReelView = 0;
                    let edges = data?.edge_felix_video_timeline?.edges;
                    edges.forEach((res) => {
                        averageReelView += Math.trunc(res.node?.video_view_count / 12);
                        totalReelView += res?.node?.video_view_count;
                    })
                    avg_likes = 0;
                    avg_comment = 0;
                    noOfPosts = data?.edge_owner_to_timeline_media?.edges;
                    noOfPosts.forEach((item) => {
                        avg_likes += Math.trunc(item?.node?.edge_liked_by?.count / 12);
                        avg_comment += Math.trunc(item?.node?.edge_media_to_comment?.count / 12);
                        engagementRate = ((avg_likes + avg_comment) / data.edge_followed_by.count) * 100;
                        // engagementRate = Number(engagementRate.toFixed(2))
                        engagementRate = engagementRate.toString();
                        engagementRate = engagementRate.slice(0, (engagementRate.indexOf(".")) + 2 + 1);
                        engagementRate = Number(engagementRate);
                    });
                    noOfPosts.unshift({ avg_likes: avg_likes, er: engagementRate, avg_comment: avg_comment })
                    edges.unshift({ averageReelView: averageReelView, totalReelView: totalReelView })
                    InfluencersData.findOne({ username: data.username })
                        .then((item) => {
                            if (item) {
                                item.edge_followed_by = data?.edge_followed_by,
                                    item.full_name = data?.full_name,
                                    item.is_verified = data?.is_verified,
                                    item.external_url = data?.external_url,
                                    item.edge_follow = data?.edge_follow,
                                    item.category_enum = data?.category_enum,
                                    item.edge_felix_video_timeline = data?.edge_felix_video_timeline,
                                    item.edge_owner_to_timeline_media = data?.edge_owner_to_timeline_media,
                                    item.save()
                                        .then((response) => {
                                            if (response) {
                                                console.log('Edited');
                                            }
                                        })
                            }
                            else {
                                InfluencersData.insertMany([data])
                                    .then((result) => {
                                        data.isAdded = true;
                                        data.save()
                                        console.log(result);
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                }
                // array.push(data)
            })
            // array.forEach((item) => {
            //     InfluencersData.insertMany([item])
            //         .then((result) => {
            //             console.log(result);
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            // })
            ProfileData.find({ isAdded: true })
                .select({
                    username: 1,
                })
                .then((fetchedData) => {
                    res.json(`items added ${fetchedData.length} - ${result.length}`)
                })
        })
}

exports.username = (req, res, next) => {
    let { username } = req.body;
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    axios.get(url, {
        method: 'GET',
        headers: URLENCODED_HEADER,
        mode: 'cors'
    }).then((response) => {
        res.status(200).json({
            success: true,
            data: response.data
        });
        console.log(response.data)
    })
}

// exports.influencer_list = (req, res, next) => {
//     let { username, follower_count, category_enum, full_name } = req.body;
//     // let query = {};
//     let filter = {};
//     if (username != null) {
//         filter.username = username;
//         // { username: { $regex: username, $options: 'i' } }
//     }
//     if (full_name != null) {
//         filter.full_name = full_name;
//     }
//     if (follower_count != null) {
//         filter.follower_count = follower_count;
//     }
//     if (category_enum != null) {
//         filter.category_enum = category_enum;
//     }
//     ProfileData.find(filter)
//         .then((data) => {
//             // console.log(data)
//             res.json({
//                 success: 'true',
//                 data
//             })
//         })
// }

exports.influencer_list = (req, res, next) => {
    let { category, location } = req.query;
    let filter = {};
    if (category != null) {
        filter.category_enum = new RegExp(category, 'i');
    }
    if (location != null) {
        filter.city_name = new RegExp(location, 'i');
    }
    InfluencersData.find(filter)
        .then((data) => {
            console.log(filter)
            res.json(data)
        })
}

exports.influencer_search = (req, res, next) => {
    var filter = {}
    let { inputField } = req.query;
    let limit = parseInt(req.query.limit);
    let skip = parseInt(req.query.skip);
    if (inputField != null) {
        filter = { $or: [{ full_name: { $regex: inputField, $options: 'i' } }, { username: { $regex: inputField, $options: 'i' } }, { category_enum: { $regex: inputField, $options: 'i' } }] }
    }
    let flag = [];
    InfluencersData.count(filter, function (err, count) {
        totalPages = Math.ceil(count / limit);
        const totalDataLength = count;
        InfluencersData.find(filter)
            .limit(limit)
            .skip(skip)
            .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1, is_verified })
            .then((result) => {
                flag.push(result)
                if (flag[0].length > 0) {
                    const currentPage = Math.ceil(skip / limit);
                    res.json({ result: result, totalPages, currentPage, totalDataLength })
                }
                else {
                    InfluencersData.find()
                        .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1, is_verified })
                        .then((result) => {
                            const currentPage = Math.ceil(skip / limit);
                            res.json({ result: result, totalPages, currentPage, totalDataLength })
                        })
                }
            })
    })
}

// exports.testinnng = (req, res) => {
//     const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=thesocialbox`;
//     axios.get(url, {
//         method: 'GET',
//         headers: URLENCODED_HEADER,
//         mode: 'cors',
//     })
//         .then((response) => {
//             res.status(200).json({
//                 success: true,
//                 data: response.data
//             });
//             Testing.insertMany([response.data['data']['user']])
//                 .then((result) => {
//                     // res.json({
//                     //     success: 'true',
//                     //     result: response.data['data']['user']
//                     // })
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//         })
// }

exports.filteredInfluencersData = (req, res) => {
    let { minFollowers, maxFollowers } = req.query;
    let filter = [];
    let array = [];
    if (minFollowers != 0 && maxFollowers != 0) {
    }
    InfluencersData.find()
        .then((data) => {
            array.push(data)
            array.forEach((data) => {
                data.forEach((response) => {
                    if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers) {
                        filter.push(response)
                    }
                })
                res.json(filter)
            })
        })
}
exports.filteredByErInfluencersData = (req, res) => {
    let { minEr, maxEr } = req.query;
    let filter = [];
    let array = [];
    if (minEr != 0 && maxEr != 0) {
    }
    InfluencersData.find()
        .then((data) => {
            array.push(data)
            array.forEach((data) => {
                data.forEach((response) => {
                    if (response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
                        filter.push(response)
                    }
                })
                res.json(filter)
            })
        })
}


exports.createList = (req, res, next) => {
    let { listName, reel, post, story, igtv, description, swipeup, video } = req.body;
    let errors = [];
    let error1 = [];
    if (!listName) {
        errors.push('Please fill list name');
        return res.status(422).json({ errors: errors });
    }

    if (!reel) {
        reel = '0';
    }

    if (!post) {
        post = '0';
    }

    if (!story) {
        story = '0';
    }

    if (!igtv) {
        igtv = '0';
    }

    if (!swipeup) {
        swipeup = '0';
    }

    if (!video) {
        video = '0';
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    UserInfo.findByIdAndUpdate(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(401).json({
                    error: "You need to be logged in to access this route",
                });
            }

            data.list.forEach((item) => {
                if (item.listName === listName) {
                    error1.push(item.listName)

                }
            });

            if (error1.length > 0) {
                return res.json("List name Already Present")
            }
            else {
                data.list.push({ listName: listName, description: description, deliverables: [{ reel: reel }, { post: post }, { story: story }, { igtv: igtv }, { swipeup: swipeup }, { video: video }] })
                data.lastListAdded = listName;
                data.save();
                res.json(data)
            }
        });
}

exports.editDeliverables = (req, res) => {
    let { listName } = req.query
    let { reel, post, story, igtv, swipeup, video } = req.body;
    let { newListName, description } = req.body;

    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === listName) {
                    let abc = data.list.findIndex(obj => obj.listName === listName)
                    if (reel) {
                        data.list[abc].deliverables[0] = {
                            reel: reel,
                        }
                    }
                    if (post) {
                        data.list[abc].deliverables[1] = {
                            post: post,
                        }
                    }
                    if (story) {
                        data.list[abc].deliverables[2] = {
                            story: story,
                        }
                    }
                    if (igtv) {
                        data.list[abc].deliverables[3] = {
                            igtv: igtv,
                        }
                    }
                    if (swipeup) {
                        data.list[abc].deliverables[4] = {
                            swipeup: swipeup,
                        }
                    }
                    if (video) {
                        data.list[abc].deliverables[5] = {
                            video: video,
                        }
                    }
                    if (newListName) {
                        data.list[abc].listName = newListName;
                    }
                    if (description) {
                        data.list[abc].description = description;
                    }
                }
            });
            data.save();
            res.json(data)
        })
}

exports.getListData = (req, res) => {
    UserInfo.findById(req.params.id).then((data) => {
        if (!data)
            return res.status(401).json({
                error: "You need to be logged in to access this route",
            });
        else {
            res.json(data.list)
        }
    });
}

exports.addInfluencersToList = (req, res) => {
    let errors = [];
    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === req.query.list) {
                    InfluencersData.find({ username: req.query.username })
                        .then((result) => {
                            item.influencersData.forEach((response) => {
                                if (response.username === req.query.username) {
                                    errors.push(response.username)
                                }
                            })
                            if (errors.length > 0) {
                                return res.json("Data Already Present")
                            }
                            else {
                                let listInfluencersData = item.influencersData.push(result[0])
                                res.json(item.influencersData)
                                data.save();
                            }
                        })
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.showInfluencersInList = (req, res) => {
    let response = [];
    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === req.query.list) {
                    response.push({ influencers_count: item.influencersData.length, item })
                }
            })

            return res.status(200).json(response)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.deleteInfluencersFromList = (req, res) => {
    let filter = [];
    let { listname, username } = req.body;
    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === listname) {
                    filter.push(item)
                }
            });
            filter[0].influencersData.forEach((result) => {
                if (result.username === username) {
                    filter[0].deletedInfluencers.push(result)
                    for (var i = filter[0].influencersData.length - 1; i >= 0; --i) {
                        if (filter[0].influencersData[i].username == username) {
                            filter[0].influencersData.splice(i, 1);
                        }
                    }
                }
            })
            data.save();
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.deleteList = (req, res) => {
    let { listName } = req.query;
    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === listName) {
                    data.list.splice(
                        data.list.findIndex(obj => obj.listName === listName), 1);
                }
            })
            data.save();
            res.json(data)
        })
}

exports.getUserDetails = (req, res) => {
    UserInfo.findById(req.params.id)
        .then((data) => {
            res.json(data)
        })
}


// exports.getFilteredResults = (req, res) => {
//     let { minEr, maxEr, minFollowers, maxFollowers, inputField } = req.query;
//     let array = [];
//     let result = [];
//     let search = {};
//     let limit = parseInt(req.query.limit);
//     let skip = parseInt(req.query.skip);
//     if (inputField != null) {
//         search = { $or: [{ full_name: { $regex: inputField, $options: 'i' } }, { username: { $regex: inputField, $options: 'i' } }, { category_enum: { $regex: inputField, $options: 'i' } }] }
//     }
//     let flag = [];
//     let totalPages = 0;
//     let totalDataLength = 0;
//     InfluencersData.find({ $and: [search, { 'edge_followed_by.count': { $gte: parseInt(minFollowers), $lte: parseInt(maxFollowers) } }] })
//         .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1 })
//         .then((data) => {
//             res.json(data)
//         })
//     InfluencersData.count(search, function (err, count) {
//         totalPages = Math.ceil(count / limit);
//         totalDataLength = count;
//         InfluencersData.find(search)
//             .limit(limit)
//             .skip(skip)
//             .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1 })
//             .then((data) => {
//                 flag.push(data)
//                 if (flag[0].length > 0) {
//                     const currentPage = Math.ceil(skip / limit) + 1;
//                     array.push(data)
//                     if (minFollowers && maxFollowers && minEr && maxEr) {
//                         array.forEach((item) => {
//                             item.forEach((response) => {
//                                 if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers && response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
//                                     result.push(response)
//                                 }
//                             })
//                         })
//                     }
//                     else if (minFollowers && maxFollowers && !minEr && !maxEr) {
//                         array.forEach((item) => {
//                             item.forEach((response) => {
//                                 if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers) {
//                                     result.push(response)
//                                 }
//                             })
//                         })
//                     }
//                     else if (!minFollowers && !maxFollowers && minEr && maxEr) {
//                         array.forEach((data) => {
//                             data.forEach((response) => {
//                                 if (response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
//                                     result.push(response)
//                                 }
//                             })
//                         })
//                     }
//                     else if (!minFollowers && !maxFollowers && !minEr && !maxEr) {
//                         data.forEach((item) => {
//                             result.push(item)
//                         })
//                     }
//                     {
//                         if (result >= 1) {
//                             if (result.length > 1) {
//                                 res.json({ result, totalPages, currentPage, totalDataLength })
//                             }
//                             else {
//                                 result.map((item) =>
//                                     res.json({ item, totalPages, currentPage, totalDataLength })
//                                 )
//                             }
//                             // result.length > 1 ?
//                             //     totalPages = Math.ceil(result.length / limit)
//                             // totalDataLength = result.length
//                             // res.json({ result, totalPages, currentPage, totalDataLength })
//                             //     :
//                             // result.map((item) =>
//                             //     res.json({ item, totalPages, currentPage, totalDataLength })
//                             // )
//                         } else {
//                             res.json({ result, totalPages, currentPage, totalDataLength })
//                         }
//                     }
//                 }
//                 else {
//                     InfluencersData.find()
//                         .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1 })
//                         .then((data) => {
//                             const currentPage = Math.ceil(skip / limit) + 1;
//                             array.push(data)
//                             if (minFollowers && maxFollowers && minEr && maxEr) {
//                                 array.forEach((item) => {
//                                     item.forEach((response) => {
//                                         if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers && response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
//                                             result.push(response)
//                                         }
//                                     })
//                                 })
//                             }
//                             else if (minFollowers && maxFollowers && !minEr && !maxEr) {
//                                 array.forEach((item) => {
//                                     item.forEach((response) => {
//                                         if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers) {
//                                             result.push(response)
//                                         }
//                                     })
//                                 })
//                             }
//                             else if (!minFollowers && !maxFollowers && minEr && maxEr) {
//                                 array.forEach((data) => {
//                                     data.forEach((response) => {
//                                         if (response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
//                                             result.push(response)
//                                         }
//                                     })
//                                 })
//                             }
//                             else if (!minFollowers && !maxFollowers && !minEr && !maxEr) {
//                                 data.forEach((item) => {
//                                     result.push(item)
//                                 })
//                                 // result.push(data)
//                             }
//                             {
//                                 if (result >= 1) {
//                                     result.length > 1 ?
//                                         res.json({ result, totalPages, currentPage, totalDataLength })
//                                         :
//                                         result.map((item) =>
//                                             res.json({ item, totalPages, currentPage, totalDataLength })
//                                         )
//                                 } else {
//                                     res.json({ result, totalPages, currentPage, totalDataLength })
//                                 }
//                             }
//                         })
//                 }

//             })
//     })
// }

exports.getFilteredResults = (req, res) => {
    let { minEr, maxEr, minFollowers, maxFollowers, inputField } = req.query;
    let search = {};
    let limit = parseInt(req.query.limit);
    let skip = parseInt(req.query.skip);
    if (inputField != null) {
        search = { $or: [{ full_name: { $regex: inputField, $options: 'i' } }, { username: { $regex: inputField, $options: 'i' } }, { category_enum: { $regex: inputField, $options: 'i' } }] }
    }
    let flag = [];
    let totalPages = 0;
    let totalDataLength = 0;
    let filter = {};

    if (minFollowers && maxFollowers && !minEr && !maxEr) {
        filter = { $and: [search, { 'edge_followed_by.count': { $gte: parseInt(minFollowers), $lte: parseInt(maxFollowers) } }] }
    }

    else if (minEr && maxEr && !minFollowers && !maxFollowers) {
        filter = { $and: [search, { 'edge_owner_to_timeline_media.edges.er': { $gte: parseInt(minEr), $lte: parseInt(maxEr) } }] }
    }

    else if (minEr && maxEr && minFollowers && maxFollowers) {
        filter = { $and: [search, { 'edge_owner_to_timeline_media.edges.er': { $gte: parseInt(minEr), $lte: parseInt(maxEr) } }, { 'edge_followed_by.count': { $gte: parseInt(minFollowers), $lte: parseInt(maxFollowers) } }] }
    }

    else if (!minEr && !maxEr && !minFollowers && !maxFollowers) {
        filter = { $or: [{ full_name: { $regex: inputField, $options: 'i' } }, { username: { $regex: inputField, $options: 'i' } }, { category_enum: { $regex: inputField, $options: 'i' } }] }
    }

    InfluencersData.count(filter, function (err, count) {
        totalPages = Math.ceil(count / limit);
        totalDataLength = count;
        InfluencersData.find(filter)
            .sort({ edge_followed_by: -1 })
            .limit(limit)
            .skip(skip)
            .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1, is_verified: 1, final_category: 1, final_city: 1 })
            .then((result) => {
                flag.push(result)
                if (flag[0].length > 0) {
                    const currentPage = Math.ceil(skip / limit) + 1;
                    res.json({ result, totalPages, currentPage, totalDataLength })
                }
                else {
                    InfluencersData.count({}, function (err, count) {
                        totalPages = Math.ceil(count / limit);
                        totalDataLength = count;
                        InfluencersData.find()
                            .limit(limit)
                            .skip(skip)
                            .select({ username: 1, _id: 0, edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, 'edge_felix_video_timeline.edges.averageReelView': 1, 'edge_felix_video_timeline.edges.totalReelView': 1, city_name: 1, category_enum: 1, costFactorPosts: 1, costFactorReel: 1, costFactorStories: 1, costFactorVideo: 1, costFactorIgtv: 1, costFactorSwipeUp: 1, full_name: 1, profile_pic_url_hd: 1, is_verified: 1, final_category: 1, final_city: 1 })
                            .then((result) => {
                                const currentPage = Math.ceil(skip / limit) + 1;
                                res.json({ result, totalPages, currentPage, totalDataLength })
                            })
                    })

                }
            })
    })
}

exports.clearDeletedInfluencersFromList = (req, res) => {
    let { listName } = req.query;
    UserInfo.findById(req.params.id)
        .then((data) => {
            data.list.forEach((item) => {
                if (item.listName === listName) {
                    item.deletedInfluencers = [];
                }
            })
            data.save()
                .then((item) => {
                    res.json(item)
                })
        })
}