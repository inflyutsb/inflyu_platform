const InfluencersData = require('../../Models/influencer_details');
const BasicCost = require('../../Models/basiccost');

exports.setCalculateCostForReel = (req, res) => {
    let { minCostPer1kFollowersForReel,
        maxCostper1KFollowersForReel,
        minCostPerLikeForReel,
        maxCostperLikeForReel,
        minCostPerCommentForReel,
        maxCostperCommentForReel,
    } = req.body;

    let costFactor = {};

    if (minCostPer1kFollowersForReel && maxCostper1KFollowersForReel) {
        costFactor.minCostPer1kFollowersForReel = minCostPer1kFollowersForReel;
        costFactor.maxCostper1KFollowersForReel = maxCostper1KFollowersForReel;
    }

    if (minCostPerLikeForReel && maxCostperLikeForReel && minCostPerCommentForReel && maxCostperCommentForReel) {
        costFactor.minCostPerLikeForReel = minCostPerLikeForReel;
        costFactor.maxCostperLikeForReel = maxCostperLikeForReel;
        costFactor.minCostPerCommentForReel = minCostPerCommentForReel;
        costFactor.maxCostperCommentForReel = maxCostperCommentForReel;
    }

    let array = [];

    BasicCost.findOne({ minCostPer1kFollowersForReel })
        .then((data) => {
            if (data) {
                data.costFactorReel = costFactor
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorReel: costFactor,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorReel: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorReel.influencerExactminTotalCost || !item.costFactorReel.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForReel * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForReel * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForReel * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForReel * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForReel / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForReel / 1000) * item.edge_followed_by.count;
                    costFactor.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactor.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorReel = costFactor;
                    item.save()
                    array.push(item)
                }
                else {
                    console.log(item.costFactorReel)
                }
            })
            res.json(array);
        })
}

exports.setCalculateCostForPosts = (req, res) => {
    let { minCostPer1kFollowersForPosts,
        maxCostper1KFollowersForPosts,
        minCostPerLikeForPosts,
        maxCostperLikeForPosts,
        minCostPerCommentForPosts,
        maxCostperCommentForPosts,
    } = req.body;

    let costFactorPost = {};


    if (minCostPer1kFollowersForPosts && maxCostper1KFollowersForPosts) {
        costFactorPost.minCostPer1kFollowersForPosts = minCostPer1kFollowersForPosts;
        costFactorPost.maxCostper1KFollowersForPosts = maxCostper1KFollowersForPosts;
    }

    if (minCostPerLikeForPosts && maxCostperLikeForPosts && minCostPerCommentForPosts && maxCostperCommentForPosts) {
        costFactorPost.minCostPerLikeForPosts = minCostPerLikeForPosts;
        costFactorPost.maxCostperLikeForPosts = maxCostperLikeForPosts;
        costFactorPost.minCostPerCommentForPosts = minCostPerCommentForPosts;
        costFactorPost.maxCostperCommentForPosts = maxCostperCommentForPosts;
    }


    BasicCost.findOne({ minCostPer1kFollowersForPosts })
        .then((data) => {
            if (data) {
                data.costFactorPosts = costFactorPost
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorPosts: costFactorPost,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })


    let array = [];

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorPosts: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorPosts.influencerExactminTotalCost || !item.costFactorPosts.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForPosts * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForPosts * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForPosts * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForPosts * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForPosts / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForPosts / 1000) * item.edge_followed_by.count;
                    costFactorPost.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactorPost.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorPosts = costFactorPost;
                    item.save();
                    array.push(item)
                }
                else {
                    console.log(item.costFactorPosts)
                }
            })
            res.json(array);
        })

}

exports.setCalculateCostForIgtv = (req, res) => {
    let { minCostPer1kFollowersForIgtv,
        maxCostper1KFollowersForIgtv,
        minCostPerLikeForIgtv,
        maxCostperLikeForIgtv,
        minCostPerCommentForIgtv,
        maxCostperCommentForIgtv,
    } = req.body;

    let costFactorIgtv = {};

    if (minCostPer1kFollowersForIgtv && maxCostper1KFollowersForIgtv) {
        costFactorIgtv.minCostPer1kFollowersForIgtv = minCostPer1kFollowersForIgtv;
        costFactorIgtv.maxCostper1KFollowersForIgtv = maxCostper1KFollowersForIgtv;
    }

    if (minCostPerLikeForIgtv && maxCostperLikeForIgtv && minCostPerCommentForIgtv && maxCostperCommentForIgtv) {
        costFactorIgtv.minCostPerLikeForIgtv = minCostPerLikeForIgtv;
        costFactorIgtv.maxCostperLikeForIgtv = maxCostperLikeForIgtv;
        costFactorIgtv.minCostPerCommentForIgtv = minCostPerCommentForIgtv;
        costFactorIgtv.maxCostperCommentForIgtv = maxCostperCommentForIgtv;
    }

    BasicCost.findOne({ minCostPer1kFollowersForIgtv })
        .then((data) => {
            if (data) {
                data.costFactorIgtv = costFactorIgtv
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorIgtv: costFactorIgtv,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })

    let array = [];

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorIgtv: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorIgtv.influencerExactminTotalCost || !item.costFactorIgtv.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForIgtv * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForIgtv * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForIgtv * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForIgtv * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForIgtv / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForIgtv / 1000) * item.edge_followed_by.count;
                    costFactorIgtv.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactorIgtv.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorIgtv = costFactorIgtv;
                    item.save();
                    array.push(item)
                }
                else {
                    console.log(item.costFactorIgtv)
                }
            })
            res.json(array);
        })

}

exports.setCalculateCostForStories = (req, res) => {
    let { minCostPer1kFollowersForStory,
        maxCostper1KFollowersForStory,
        minCostPerLikeForStory,
        maxCostperLikeForStory,
        minCostPerCommentForStory,
        maxCostperCommentForStory,
    } = req.body;

    let costFactorStories = {};

    if (minCostPer1kFollowersForStory && maxCostper1KFollowersForStory) {
        costFactorStories.minCostPer1kFollowersForStory = minCostPer1kFollowersForStory;
        costFactorStories.maxCostper1KFollowersForStory = maxCostper1KFollowersForStory;
    }

    if (minCostPerLikeForStory && maxCostperLikeForStory && minCostPerCommentForStory && maxCostperCommentForStory) {
        costFactorStories.minCostPerLikeForStory = minCostPerLikeForStory;
        costFactorStories.maxCostperLikeForStory = maxCostperLikeForStory;
        costFactorStories.minCostPerCommentForStory = minCostPerCommentForStory;
        costFactorStories.maxCostperCommentForStory = maxCostperCommentForStory;
    }

    let array = [];

    BasicCost.findOne({ minCostPer1kFollowersForStory })
        .then((data) => {
            if (data) {
                data.costFactorStories = costFactorStories
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorStories: costFactorStories,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorStories: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorStories.influencerExactminTotalCost || !item.costFactorStories.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForStory * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForStory * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForStory * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForStory * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForStory / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForStory / 1000) * item.edge_followed_by.count;
                    costFactorStories.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactorStories.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorStories = costFactorStories;
                    item.save();
                    array.push(item)
                }
                else {
                    console.log(item.costFactorStories)
                }
            })
            res.json(array);
        })

}

exports.setCalculateCostForSwipeupStories = (req, res) => {
    let { minCostPer1kFollowersForSwipeUpStory,
        maxCostper1KFollowersForSwipeUpStory,
        minCostPerLikeForSwipeUpStory,
        maxCostperLikeForSwipeUpStory,
        minCostPerCommentForSwipeUpStory,
        maxCostperCommentForSwipeUpStory,
    } = req.body;

    let costFactorSwipeUp = {};

    if (minCostPer1kFollowersForSwipeUpStory && maxCostper1KFollowersForSwipeUpStory) {
        costFactorSwipeUp.minCostPer1kFollowersForSwipeUpStory = minCostPer1kFollowersForSwipeUpStory;
        costFactorSwipeUp.maxCostper1KFollowersForSwipeUpStory = maxCostper1KFollowersForSwipeUpStory;
    }

    if (minCostPerLikeForSwipeUpStory && maxCostperLikeForSwipeUpStory && minCostPerCommentForSwipeUpStory && maxCostperCommentForSwipeUpStory) {
        costFactorSwipeUp.minCostPerLikeForSwipeUpStory = minCostPerLikeForSwipeUpStory;
        costFactorSwipeUp.maxCostperLikeForSwipeUpStory = maxCostperLikeForSwipeUpStory;
        costFactorSwipeUp.minCostPerCommentForSwipeUpStory = minCostPerCommentForSwipeUpStory;
        costFactorSwipeUp.maxCostperCommentForSwipeUpStory = maxCostperCommentForSwipeUpStory;
    }

    BasicCost.findOne({ minCostPer1kFollowersForSwipeUpStory })
        .then((data) => {
            if (data) {
                data.costFactorSwipeUp = costFactorSwipeUp
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorSwipeUp: costFactorSwipeUp,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })
    let array = [];

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorSwipeUp: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorSwipeUp.influencerExactminTotalCost || !item.costFactorSwipeUp.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForSwipeUpStory * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForSwipeUpStory * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForSwipeUpStory * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForSwipeUpStory * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForSwipeUpStory / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForSwipeUpStory / 1000) * item.edge_followed_by.count;
                    costFactorSwipeUp.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactorSwipeUp.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorSwipeUp = costFactorSwipeUp;
                    item.save();
                    array.push(item)
                }
                else {
                    console.log(item.costFactorSwipeUp)
                }
            })
            res.json(array);
        })

}

exports.setCalculateCostForVideos = (req, res) => {
    let { minCostPer1kFollowersForVideo,
        maxCostper1KFollowersForVideo,
        minCostPerLikeForVideo,
        maxCostperLikeForVideo,
        minCostPerCommentForVideo,
        maxCostperCommentForVideo,
    } = req.body;

    let costFactorVideo = {};

    if (minCostPer1kFollowersForVideo && maxCostper1KFollowersForVideo) {
        costFactorVideo.minCostPer1kFollowersForVideo = minCostPer1kFollowersForVideo;
        costFactorVideo.maxCostper1KFollowersForVideo = maxCostper1KFollowersForVideo;
    }

    if (minCostPerLikeForVideo && maxCostperLikeForVideo && minCostPerCommentForVideo && maxCostperCommentForVideo) {
        costFactorVideo.minCostPerLikeForVideo = minCostPerLikeForVideo;
        costFactorVideo.maxCostperLikeForVideo = maxCostperLikeForVideo;
        costFactorVideo.minCostPerCommentForVideo = minCostPerCommentForVideo;
        costFactorVideo.maxCostperCommentForVideo = maxCostperCommentForVideo;
    }

    BasicCost.findOne({ minCostPer1kFollowersForVideo })
        .then((data) => {
            if (data) {
                data.costFactorVideo = costFactorVideo
                data.save()
                    .then((result) => {
                    })
            }
            else {
                const abc = new BasicCost({
                    costFactorVideo: costFactorVideo,
                })
                abc.save()
                    .then((result) => {
                    })
            }
        })

    let array = [];

    InfluencersData.find()
        .select({ edge_followed_by: 1, 'edge_owner_to_timeline_media.edges.avg_likes': 1, 'edge_owner_to_timeline_media.edges.avg_comment': 1, 'edge_owner_to_timeline_media.edges.er': 1, costFactorVideo: 1, })
        .then((data) => {
            data.forEach((item) => {
                if (!item.costFactorVideo.influencerExactminTotalCost || !item.costFactorVideo.influencerExactmaxTotalCost) {
                    minCostPerLike = minCostPerLikeForVideo * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    minCostPerComment = minCostPerCommentForVideo * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    maxCostperLike = maxCostperLikeForVideo * item.edge_owner_to_timeline_media.edges[0].avg_likes;
                    maxCostperComment = maxCostperCommentForVideo * item.edge_owner_to_timeline_media.edges[0].avg_comment;
                    let minCostPer1kFollowers = (minCostPer1kFollowersForVideo / 1000) * item.edge_followed_by.count;
                    let maxCostPer1kFollowers = (maxCostper1KFollowersForVideo / 1000) * item.edge_followed_by.count;
                    costFactorVideo.minTotalCost = minCostPer1kFollowers + minCostPerLike + minCostPerComment;
                    costFactorVideo.maxTotalCost = maxCostPer1kFollowers + maxCostperLike + maxCostperComment;
                    item.costFactorVideo = costFactorVideo;
                    item.save();
                    array.push(item)
                }
                else {
                    console.log(item.costFactorVideo)
                }
            })
            res.json(array);
        })

}

exports.setInfluencerCost = (req, res) => {
    let { username, minTotalPostCost, maxTotalPostCost, minTotalReelCost, maxTotalReelCost, minTotalIgtvCost, maxTotalIgtvCost, minTotalStoryCost, maxTotalStoryCost, minTotalSwipeUpCost, maxTotalSwipeUpCost, minTotalVideoCost, maxTotalVideoCost } = req.body;
    let costFactorPosts = {};
    let costFactorReel = {};
    let costFactorStories = {};
    let costFactorIgtv = {};
    let costFactorSwipeUp = {};
    let costFactorVideo = {};

    if (minTotalPostCost && minTotalPostCost !== 0) {
        costFactorPosts.influencerExactminTotalCost = minTotalPostCost;
    }
    if (maxTotalPostCost && maxTotalPostCost !== 0) {
        costFactorPosts.influencerExactmaxTotalCost = maxTotalPostCost;
    }
    if (minTotalReelCost && minTotalReelCost !== 0) {
        costFactorReel.influencerExactminTotalCost = minTotalReelCost;
    }
    if (maxTotalReelCost && maxTotalReelCost !== 0) {
        costFactorReel.influencerExactmaxTotalCost = maxTotalReelCost;
    }
    if (minTotalStoryCost && minTotalStoryCost !== 0) {
        costFactorStories.influencerExactminTotalCost = minTotalStoryCost;
    }
    if (maxTotalStoryCost && maxTotalStoryCost !== 0) {
        costFactorStories.influencerExactmaxTotalCost = maxTotalStoryCost;
    }
    if (minTotalIgtvCost && minTotalIgtvCost !== 0) {
        costFactorIgtv.influencerExactminTotalCost = minTotalIgtvCost;
    }
    if (maxTotalIgtvCost && maxTotalIgtvCost !== 0) {
        costFactorIgtv.influencerExactmaxTotalCost = maxTotalIgtvCost;
    }
    if (minTotalSwipeUpCost && minTotalSwipeUpCost !== 0) {
        costFactorSwipeUp.influencerExactminTotalCost = minTotalSwipeUpCost;
    }
    if (maxTotalSwipeUpCost && maxTotalSwipeUpCost !== 0) {
        costFactorSwipeUp.influencerExactmaxTotalCost = maxTotalSwipeUpCost;
    }
    if (minTotalVideoCost && minTotalVideoCost !== 0) {
        costFactorVideo.influencerExactminTotalCost = minTotalVideoCost;
    }
    if (maxTotalVideoCost && maxTotalVideoCost !== 0) {
        costFactorVideo.influencerExactmaxTotalCost = maxTotalVideoCost;
    }

    InfluencersData.findOne({ username: username })
        .select({
            username: 1, costFactorPosts: 1, costFactorReel: 1, costFactorIgtv: 1, costFactorStories: 1,
            costFactorSwipeUp: 1, costFactorVideo: 1
        })
        .then((data) => {
            if (minTotalPostCost || maxTotalPostCost) {
                data.costFactorPosts = costFactorPosts;
            }
            if (minTotalIgtvCost || maxTotalIgtvCost) {
                data.costFactorIgtv = costFactorIgtv;
            }
            if (minTotalReelCost || maxTotalReelCost) {
                data.costFactorReel = costFactorReel;
            }
            if (minTotalStoryCost || maxTotalStoryCost) {
                data.costFactorStories = costFactorStories
            }
            if (minTotalSwipeUpCost || maxTotalSwipeUpCost) {
                data.costFactorSwipeUp = costFactorSwipeUp
            }
            if (minTotalVideoCost || maxTotalVideoCost) {
                data.costFactorVideo = costFactorVideo
            }
            data.save();
            res.json(data)
        })
}

exports.getBasicRate = (req, res) => {
    BasicCost.find({})
        .then((data) => {
            res.json(data)
        })
}