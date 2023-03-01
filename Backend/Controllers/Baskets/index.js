const CategorizedBasket = require('../../Models/categorised_basket');
const InfluencersData = require('../../Models/influencer_details');
const fs = require('fs')
const path = require("path");
const multer = require("multer");
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "ap-south-1",
})
const upload = multer({ dest: 'uploads/' });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext);
//     },
// });

// const upload = multer({
//     storage: storage,
// });

(module.exports.upload = upload.single("image")),
    (req, res, next) => {
        next();
    };
exports.createCategorizedBasket = (req, res) => {
    let { categoryName } = req.body;

    CategorizedBasket.findOne({ categoryName: categoryName })
        .then((data) => {
            if (data) {
                res.json("Basket Already Present")
            }
            else {
                const categorizedBasket = new CategorizedBasket({
                    categoryName: categoryName,
                })
                categorizedBasket.save()
                    .then((response) => {
                        res.status(200).json(response)
                    })
            }
        })

}

exports.addImageToBasket = (req, res) => {
    let { categoryName } = req.query;

    CategorizedBasket.findOne({ categoryName: categoryName })
        .then((data) => {
            data.image = req.file.originalname;
            const fileStream = fs.createReadStream(req.file.path)
            s3.upload({
                Bucket: 'socialbox-bckt',
                Key: `Basket/${categoryName}/image.png`,
                ACL: 'public-read',
                Body: fileStream,
            }).promise()
            data.save()
                .then((response) => {
                    res.json(response)
                }).catch(err => {
                    console.log(err)
                })
        })

}

exports.showCategorizedBasket = (req, res) => {
    CategorizedBasket.find()
        .then((data) => {
            if (!data) {
                res.json("No Basket Present")
            }
            else {
                data.forEach((item) => {
                    item.basketInfluencersCount = item.basket.length
                })
                res.json(data)
            }
        })
}

exports.addInfluencersToBasket = (req, res) => {
    let { username, categoryName } = req.body;
    if (!username) {
        res.json("Username Not Given")
    }
    else {
        InfluencersData.find({ username: username })
            .then((data) => {
                if (data) {
                    CategorizedBasket.findOne({ categoryName: categoryName })
                        .then((response) => {
                            if (response) {
                                response.basket.push(data[0]);
                                res.json(response)
                                response.save();
                            }
                            else {
                                res.json("Category Not Found")
                            }
                        })
                }
                else {
                    res.json("User Not found")
                }
            })
    }
}

exports.showBasketInfluencers = (req, res) => {
    let { categoryName } = req.query;

    CategorizedBasket.find({ categoryName })
        .then((data) => {
            res.json(data[0].basket)
        })
}


exports.filtered_basket_list = (req, res, next) => {
    let { category, listName } = req.query;
    let filter = [];
    let errors = [];
    if (category === null) {
        errors.push("Category Required")
    }
    if (category !== null) {
        category.category_enum = new RegExp(category, 'i')
    }
    CategorizedBasket.find({ categoryName: listName })
        .then((data) => {
            const [finalData] = data;

            finalData.basket.forEach((response) => {
                if (response.category_enum === category) {
                    filter.push(response)
                }
            });
            return res.json(filter);
        })
}

exports.followersfilteredBasketData = (req, res) => {
    let { minFollowers, maxFollowers, listName } = req.query;
    let filter = [];
    let errors = [];
    if (!minFollowers) {
        errors.push("Minimum Followers not Provided")
    }
    if (!maxFollowers) {
        errors.push("Maximum Followers not Provided")
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    CategorizedBasket.find({ categoryName: listName })
        .then((data) => {
            const [finalData] = data;

            finalData.basket.forEach((response) => {
                if (response.edge_followed_by.count > minFollowers && response.edge_followed_by.count < maxFollowers) {
                    filter.push(response)
                }
            });
            return res.json(filter);
        })
}
exports.erfilteredBasketData = (req, res) => {
    let { minEr, maxEr, listName } = req.query;
    let filter = [];
    let errors = [];
    if (!minEr) {
        errors.push("Minimum Range not Provided")
    }
    if (!maxEr) {
        errors.push("Maximum Range not Provided")
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    CategorizedBasket.find({ categoryName: listName })
        .then((data) => {
            const [finalData] = data;

            finalData.basket.forEach((response) => {
                if (response.edge_owner_to_timeline_media.edges[0].er > minEr && response.edge_owner_to_timeline_media.edges[0].er < maxEr) {
                    filter.push(response)
                }
            });

            return res.json(filter);
        })
}

exports.deleteBasket = (req, res) => {
    let { categoryName } = req.query;
    CategorizedBasket.findOneAndDelete({ categoryName: categoryName })
        .then((data) => {
            if (data) {
                res.json('Deleted Successfully');
            }
            else {
                res.json('Basket Not Present');
            }
        })
}

exports.editDescription = (req, res) => {
    let { categoryName } = req.query;
    let { description } = req.body;
    CategorizedBasket.findOne({ categoryName: categoryName })
        .then((data) => {
            if (data) {
                data.description = description;
                data.save()
                    .then((result) => {
                        res.status(200).json('Edited Successfully');
                    })
            }
            else {
                res.json('Basket Not Present');
            }
        })
}

exports.showBasketDescription = (req, res) => {
    let { categoryName } = req.query;

    CategorizedBasket.find({ categoryName })
        .then((data) => {
            res.json(data)
        })
}