const multer = require("multer");
const path = require("path");
const csv = require("csvtojson");
const fetch = require('node-fetch');
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "ap-south-1",
})
const HttpsProxyAgent = require('https-proxy-agent');
const ProfileData = require('../../Models/profile_data');
const UsernameCsv = require('../../Models/usernamecsv');
const InfluencersData = require('../../Models/influencer_details');
const proxyArray = require('../../utils/proxiesArray');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../testing_backend/static/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const URLENCODED_HEADER = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/ 605.1.15(KHTML, like Gecko) Mobile / 15E148 Instagram 105.0.0.11.118(iPhone11, 8; iOS 12_3_1; en_US; en - US; scale = 2.00; 828x1792; 165586599)',
    // 'Cookie': 'sessionid=55174935431:oUkeyOkjSTHOai:11:AYcCQRGAQW0_XSTcjaz7XHUgRoXj6weyCzi_8MCzew'
}
const random_number = Math.floor(Math.random() * 10);

const uploads = multer({ storage: storage });
(module.exports.uploadData = uploads.single("csv")),
    (req, res, next) => {
        next();
    };

exports.fetchCsvUsernames = (req, res, next) => {
    let arr = [];
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    UsernameCsv.find({ isFetched: false })
        .then((response) => {
            response.forEach((item, i) => {
                if (i < 250) {
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
                                        item.isFetched = true;
                                        item.save()
                                    }
                                    else {
                                        item.isFetched(true);
                                        item.save()
                                            .then((data) => {
                                                console.log('Username not exists');
                                            })
                                    }
                                })
                        })
                }
            })
            UsernameCsv.find({ isFetched: true })
                .then((fetchedData) => {
                    res.json(`items added ${fetchedData.length} - ${response.length}`)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}


exports.uploadcreatorcsv = (req, res) => {
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    let str = '';
    let splitArr;
    let array = [];
    csv()
        .fromFile(req.file.path)
        .then((csvData) => {
            csvData.forEach((data) => {
                if (data.handleName) {
                    UsernameCsv.insertMany({ username: data.handleName })
                        .then((data) => {
                            console.log('Added');
                        })
                    // const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${data.handleName}`;
                    // fetch(url, {
                    //     method: 'GET',
                    //     agent: proxyAgent,
                    //     headers: URLENCODED_HEADER,
                    //     mode: 'cors',
                    // })
                    //     .then((response) => {
                    //         response.json()
                    //             .then((data) => {
                    //                 if (data.data.user) {
                    //                     uploadFileToS3(data.data.user?.profile_pic_url_hd, `Images/${data.data.user.username}/${data.data.user.username}_profile_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_1_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_2_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_3_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     ProfileData.findOne({ username: data.data.user.username })
                    //                         .then((item) => {
                    //                             if (item) {
                    //                                 item.edge_followed_by = data.data.user?.edge_followed_by,
                    //                                     item.full_name = data.data.user?.full_name,
                    //                                     item.is_verified = data.data.user?.is_verified,
                    //                                     item.external_url = data.data.user?.external_url,
                    //                                     item.edge_follow = data.data.user?.edge_follow,
                    //                                     item.category_enum = data.data.user?.category_enum,
                    //                                     item.edge_felix_video_timeline = data.data.user?.edge_felix_video_timeline,
                    //                                     item.edge_owner_to_timeline_media = data.data.user?.edge_owner_to_timeline_media,
                    //                                     item.edge_media_collections = data.data.user?.edge_media_collections,
                    //                                     item.save()
                    //                                         .then((response) => {
                    //                                             if (response) {
                    //                                                 console.log('Edited');
                    //                                             }
                    //                                         })
                    //                             }
                    //                             else {
                    //                                 ProfileData.insertMany([data.data.user])
                    //                                     .then((result) => {
                    //                                     })
                    //                                     .catch((err) => {
                    //                                         console.log(err)
                    //                                     })
                    //                             }
                    //                         })
                    //                 }
                    //             })
                    //     })
                }
                else {
                    str = data.instagramhandlelink.substring(data.instagramhandlelink.indexOf('.com/') + 5);
                    if (str.includes('?') && !str.includes('/')) {
                        splitArr = str.split('?')
                        array.unshift({ username: splitArr[0] })
                    }
                    else if (str.includes('/') && !str.includes('?')) {
                        splitArr = str.split('/')
                        array.unshift({ username: splitArr[0] })
                    }
                    else if (str.includes('/') && str.includes('?')) {
                        splitArr = str.split('/')
                        array.unshift({ username: splitArr[0] })
                    }
                    UsernameCsv.insertMany({ username: array[0].username })
                        .then((data) => {
                            console.log('Added');
                        })
                    // const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${array[0].username}`;
                    // fetch(url, {
                    //     method: 'GET',
                    //     agent: proxyAgent,
                    //     headers: URLENCODED_HEADER,
                    //     mode: 'cors',
                    // })
                    //     .then((response) => {
                    //         response.json()
                    //             .then((data) => {
                    //                 if (data.data.user) {
                    //                     uploadFileToS3(data.data.user?.profile_pic_url_hd, `Images/${data.data.user.username}/${data.data.user.username}_profile_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_1_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_2_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     uploadRecentPosts_3_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    //                         .then((data) => {
                    //                             console.log("File saved!")
                    //                         })
                    //                         .catch((error) => console.log(error));
                    //                     ProfileData.findOne({ username: data.data.user.username })
                    //                         .then((item) => {
                    //                             if (item) {
                    //                                 item.edge_followed_by = data.data.user?.edge_followed_by,
                    //                                     item.full_name = data.data.user?.full_name,
                    //                                     item.is_verified = data.data.user?.is_verified,
                    //                                     item.external_url = data.data.user?.external_url,
                    //                                     item.edge_follow = data.data.user?.edge_follow,
                    //                                     item.category_enum = data.data.user?.category_enum,
                    //                                     item.edge_felix_video_timeline = data.data.user?.edge_felix_video_timeline,
                    //                                     item.edge_owner_to_timeline_media = data.data.user?.edge_owner_to_timeline_media,
                    //                                     item.edge_media_collections = data.data.user?.edge_media_collections,
                    //                                     item.save()
                    //                                         .then((response) => {
                    //                                             if (response) {
                    //                                                 console.log('Edited');
                    //                                             }
                    //                                         })
                    //                             }
                    //                             else {
                    //                                 ProfileData.insertMany([data.data.user])
                    //                                     .then((result) => {
                    //                                         console.log('added');
                    //                                     })
                    //                                     .catch((err) => {
                    //                                         console.log(err)
                    //                                     })
                    //                             }
                    //                         })
                    //                 }
                    //             })
                    //     })
                }
            })
            res.json('sucess')
        });
}

exports.updateCreatorsDetails = (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then((csvData) => {
            csvData.forEach((elm) => {
                InfluencersData.findOne({ username: elm.handleName })
                    .select({ username: 1, city_name: 1, category_enum: 1, final_category: 1, gender: 1, contact: 1, final_email: 1, dob: 1 })
                    .then((data) => {
                        if (data) {
                            data.final_category = elm.category,
                                data.gender = elm.gender,
                                data.contact = elm.contact,
                                data.final_email = elm.email,
                                data.dob = elm.dob,
                                data.final_city = elm.city
                            data.save()
                        }

                    })
            })
            res.json('success')
        });
}

exports.testingproxies = (req, res) => {
    let { username } = req.body;
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
        {
            method: 'GET',
            agent: proxyAgent,
            headers: URLENCODED_HEADER,
            mode: 'cors',
        }
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.data.user) {
                uploadFileToS3(data.data.user?.profile_pic_url_hd, `Images/${data.data.user.username}/${data.data.user.username}_profile_image.png`, 'socialbox-bckt', data.data.user)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_1_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_2_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
                    .then((data) => {
                        console.log("File saved!")
                    })
                    .catch((error) => console.log(error));
                uploadRecentPosts_3_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${data.data.user.username}/${data.data.user.username}_recent_image.png`, 'socialbox-bckt', data.data.user)
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
                                            res.json('edited')
                                        }
                                    })
                        }
                        else {
                            ProfileData.insertMany([data.data.user])
                                .then((result) => {
                                    res.json({
                                        success: 'true',
                                        result: data.data.user
                                    })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    })
            }
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


exports.fetchCsvUsernames2 = (req, res, next) => {
    let arr = [];
    let totalData = 0;
    let skip = 0;
    let limit = 250;
    const proxyAgent = new HttpsProxyAgent(`http://${proxyArray.proxyArray.list[random_number]}`)
    UsernameCsv.count({ isFetched: false }, function (err, count) {
        totalData = count;
    })
    const fetching = async () => {
        const query = await UsernameCsv.find({ isFetched: false })
            .limit(limit)
            .then((response) => {
                // response.forEach((item) => {
                //     // const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${item.username}`;
                //     // fetch(url,
                //     //     {
                //     //         method: 'GET',
                //     //         agent: proxyAgent,
                //     //         headers: URLENCODED_HEADER,
                //     //         mode: 'cors',
                //     //     }
                //     // )
                //     //     .then((response) => {
                //     //         response.json()
                //     //             .then((data) => {
                //     //                 if (data.data.user) {
                //     //                     uploadFileToS3(data.data.user?.profile_pic_url_hd, `Images/${data.data.user?.username}/${data.data.user?.username}_profile_image.png`, 'socialbox-bckt', data.data.user)
                //     //                         .then((data) => {
                //     //                             console.log("File saved!")
                //     //                         })
                //     //                         .catch((error) => console.log(error));
                //     //                     uploadRecentPosts_1_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['1']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_1.png`, 'socialbox-bckt', data.data.user)
                //     //                         .then((data) => {
                //     //                             console.log("File saved!")
                //     //                         })
                //     //                         .catch((error) => console.log(error));
                //     //                     uploadRecentPosts_2_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['2']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_2.png`, 'socialbox-bckt', data.data.user)
                //     //                         .then((data) => {
                //     //                             console.log("File saved!")
                //     //                         })
                //     //                         .catch((error) => console.log(error));
                //     //                     uploadRecentPosts_3_ToS3(data.data.user?.edge_owner_to_timeline_media?.edges['3']?.node?.display_url, `Images/${data.data.user?.username}/${data.data.user?.username}_recent_image_3.png`, 'socialbox-bckt', data.data.user)
                //     //                         .then((data) => {
                //     //                             console.log("File saved!")
                //     //                         })
                //     //                         .catch((error) => console.log(error));
                //     //                     ProfileData.findOne({ username: data.data.user.username })
                //     //                         .then((item) => {
                //     //                             if (item) {
                //     //                                 item.edge_followed_by = data.data.user?.edge_followed_by,
                //     //                                     item.full_name = data.data.user?.full_name,
                //     //                                     item.is_verified = data.data.user?.is_verified,
                //     //                                     item.external_url = data.data.user?.external_url,
                //     //                                     item.edge_follow = data.data.user?.edge_follow,
                //     //                                     item.category_enum = data.data.user?.category_enum,
                //     //                                     item.edge_felix_video_timeline = data.data.user?.edge_felix_video_timeline,
                //     //                                     item.edge_owner_to_timeline_media = data.data.user?.edge_owner_to_timeline_media,
                //     //                                     item.edge_media_collections = data.data.user?.edge_media_collections,
                //     //                                     item.save()
                //     //                                         .then((response) => {
                //     //                                             if (response) {
                //     //                                                 console.log('Edited');
                //     //                                             }
                //     //                                         })
                //     //                             }
                //     //                             else {
                //     //                                 ProfileData.insertMany([data.data.user])
                //     //                                     .then((result) => {
                //     //                                     })
                //     //                                     .catch((err) => {
                //     //                                         console.log(err)
                //     //                                     })
                //     //                             }
                //     //                         })
                //     //                     item.isFetched = true;
                //     //                     item.save()
                //     //                 }
                //     //                 else {
                //     //                     item.isFetched(true);
                //     //                     item.save()
                //     //                         .then((data) => {
                //     //                             console.log('Username not exists');
                //     //                         })
                //     //                 }
                //     //             })
                //     //     })
                // })
                skip = skip + limit;
                if (response.length > 0 && skip <= totalData) {
                    fetching();
                }
            });
    }
    fetching();
}
