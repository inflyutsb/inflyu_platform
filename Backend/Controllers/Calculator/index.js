const Calculator = require('../../Models/calculator');

exports.setBasicFieldsForReel = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    let reel = {};
    let deliverableType = 'Reel';

    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    Calculator.findOne(reel)
        .then((data) => {
            if (data) {
                data.deliverableType = deliverableType,
                    data.reel = {
                        nanoFollowers: nanoFollowers,
                        microFollowers: microFollowers,
                        midTierFollowers: midTierFollowers,
                        macroFollowers: macroFollowers,
                        megaFollowers: megaFollowers,
                    }
                data.save()
                    .then((result) => {
                        res.json(result)
                    })
            }
            else {
                const cost = new Calculator({
                    deliverableType: deliverableType,
                    reel: {
                        nanoFollowers: nanoFollowers,
                        microFollowers: microFollowers,
                        midTierFollowers: midTierFollowers,
                        macroFollowers: macroFollowers,
                        megaFollowers: megaFollowers,
                    }
                })
                cost.save()
                    .then((data) => {
                        res.json(data)
                    })
            }
        })
}

exports.setBasicFieldsForPost = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    let deliverableType = 'Post';
    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;
    let array = [];
    let array1 = [];

    Calculator.find()
        .then((data) => {
            if (data) {
                data.forEach((item) => {
                    if (item.deliverableType === 'Post') {
                        array1.push(item);
                    }
                })
                if (array1.length > 0) {
                    array1.forEach((item) => {
                        item.deliverableType = deliverableType,
                            item.post = {
                                nanoFollowers: nanoFollowers,
                                microFollowers: microFollowers,
                                midTierFollowers: midTierFollowers,
                                macroFollowers: macroFollowers,
                                megaFollowers: megaFollowers,
                            }
                        item.save()
                            .then((result) => {
                                array.push(result)
                            })
                    })
                }
                else if (array1.length === 0) {
                    const cost = new Calculator({
                        deliverableType: deliverableType,
                        post: {
                            nanoFollowers: nanoFollowers,
                            microFollowers: microFollowers,
                            midTierFollowers: midTierFollowers,
                            macroFollowers: macroFollowers,
                            megaFollowers: megaFollowers,
                        }
                    })
                    cost.save()
                        .then((data) => {
                            array.push(data)
                        })
                }
                res.json(array)
            }
        })
}

exports.setBasicFieldsForStories = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;

    let deliverableType = 'Story';
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;
    let array = [];
    let array1 = [];

    Calculator.find()
        .then((data) => {
            if (data) {
                data.forEach((item) => {
                    if (item.deliverableType === 'Story') {
                        array1.push(item);
                    }
                })
                if (array1.length > 0) {
                    array1.forEach((item) => {
                        item.deliverableType = deliverableType,
                            item.story = {
                                nanoFollowers: nanoFollowers,
                                microFollowers: microFollowers,
                                midTierFollowers: midTierFollowers,
                                macroFollowers: macroFollowers,
                                megaFollowers: megaFollowers,
                            }
                        item.save()
                            .then((result) => {
                                array.push(result)
                            })
                    })
                }
                else if (array1.length === 0) {
                    const cost = new Calculator({
                        deliverableType: deliverableType,
                        story: {
                            nanoFollowers: nanoFollowers,
                            microFollowers: microFollowers,
                            midTierFollowers: midTierFollowers,
                            macroFollowers: macroFollowers,
                            megaFollowers: megaFollowers,
                        }
                    })
                    cost.save()
                        .then((data) => {
                            array.push(data)
                        })
                }
                res.json(array)
            }
        })
}

exports.setBasicFieldsForSwipeUpStories = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;

    let deliverableType = 'Swipeup Story';
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;
    let array = [];
    let array1 = [];

    Calculator.find()
        .then((data) => {
            if (data) {
                data.forEach((item) => {
                    if (item.deliverableType === 'Swipeup Story') {
                        array1.push(item);
                    }
                })
                if (array1.length > 0) {
                    array1.forEach((item) => {
                        item.deliverableType = deliverableType,
                            item.swipeupStory = {
                                nanoFollowers: nanoFollowers,
                                microFollowers: microFollowers,
                                midTierFollowers: midTierFollowers,
                                macroFollowers: macroFollowers,
                                megaFollowers: megaFollowers,
                            }
                        item.save()
                            .then((result) => {
                                array.push(result)
                            })
                    })
                }
                else if (array1.length === 0) {
                    const cost = new Calculator({
                        deliverableType: deliverableType,
                        swipeupStory: {
                            nanoFollowers: nanoFollowers,
                            microFollowers: microFollowers,
                            midTierFollowers: midTierFollowers,
                            macroFollowers: macroFollowers,
                            megaFollowers: megaFollowers,
                        }
                    })
                    cost.save()
                        .then((data) => {
                            array.push(data)
                        })
                }
                res.json(array)
            }
        })
}

exports.setBasicFieldsForVideos = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;

    let deliverableType = 'Video';
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;
    let array = [];
    let array1 = [];

    Calculator.find()
        .then((data) => {
            if (data) {
                data.forEach((item) => {
                    if (item.deliverableType === 'Video') {
                        array1.push(item);
                    }
                })
                if (array1.length > 0) {
                    array1.forEach((item) => {
                        item.deliverableType = deliverableType,
                            item.video = {
                                nanoFollowers: nanoFollowers,
                                microFollowers: microFollowers,
                                midTierFollowers: midTierFollowers,
                                macroFollowers: macroFollowers,
                                megaFollowers: megaFollowers,
                            }
                        item.save()
                            .then((result) => {
                                array.push(result)
                            })
                    })
                }
                else if (array1.length === 0) {
                    const cost = new Calculator({
                        deliverableType: deliverableType,
                        video: {
                            nanoFollowers: nanoFollowers,
                            microFollowers: microFollowers,
                            midTierFollowers: midTierFollowers,
                            macroFollowers: macroFollowers,
                            megaFollowers: megaFollowers,
                        }
                    })
                    cost.save()
                        .then((data) => {
                            array.push(data)
                        })
                }
                res.json(array)
            }
        })
}

exports.setBasicFieldsForIgtv = (req, res) => {
    let {
        budgetperFollowersRange,
        creatorsCount,
        multipleForBudgetReach,
        multipleForBudgetLikesComment,
    } = req.body;

    let deliverableType = 'Igtv';
    let nanoFollowers = {};
    let microFollowers = {};
    let midTierFollowers = {};
    let macroFollowers = {};
    let megaFollowers = {};
    nanoFollowers.budgetperFollowersRange = budgetperFollowersRange;
    nanoFollowers.creatorsCount = creatorsCount;
    nanoFollowers.multipleForBudgetReach = multipleForBudgetReach;
    nanoFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    nanoFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;
    nanoFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * budgetperFollowersRange;
    multipleForBudgetReach = multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    microFollowers.budgetperFollowersRange = budgetperFollowersRange;
    microFollowers.creatorsCount = creatorsCount;
    microFollowers.multipleForBudgetReach = multipleForBudgetReach;
    microFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    microFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    microFollowers.reach = budgetperFollowersRange * multipleForBudgetReach;

    budgetperFollowersRange = 3.5 * microFollowers.budgetperFollowersRange;
    multipleForBudgetReach = microFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = microFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    midTierFollowers.budgetperFollowersRange = budgetperFollowersRange;
    midTierFollowers.creatorsCount = creatorsCount;
    midTierFollowers.multipleForBudgetReach = multipleForBudgetReach;
    midTierFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    midTierFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    midTierFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * midTierFollowers.budgetperFollowersRange;
    multipleForBudgetReach = midTierFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = midTierFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    macroFollowers.budgetperFollowersRange = budgetperFollowersRange;
    macroFollowers.creatorsCount = creatorsCount;
    macroFollowers.multipleForBudgetReach = multipleForBudgetReach;
    macroFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment
    macroFollowers.LikesComment = multipleForBudgetLikesComment * budgetperFollowersRange;
    macroFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;

    budgetperFollowersRange = 3.5 * macroFollowers.budgetperFollowersRange;
    multipleForBudgetReach = macroFollowers.multipleForBudgetReach - multipleForBudgetReach * (10 / 100)
    multipleForBudgetLikesComment = macroFollowers.multipleForBudgetLikesComment - multipleForBudgetLikesComment * (10 / 100);

    megaFollowers.budgetperFollowersRange = budgetperFollowersRange;
    megaFollowers.creatorsCount = creatorsCount;
    megaFollowers.multipleForBudgetReach = multipleForBudgetReach;
    megaFollowers.multipleForBudgetLikesComment = multipleForBudgetLikesComment;
    megaFollowers.LikesComment = budgetperFollowersRange * multipleForBudgetLikesComment;
    megaFollowers.reach = multipleForBudgetReach * budgetperFollowersRange;
    let array = [];
    let array1 = [];

    Calculator.find()
        .then((data) => {
            if (data) {
                data.forEach((item) => {
                    if (item.deliverableType === 'Igtv') {
                        array1.push(item);
                    }
                })
                if (array1.length > 0) {
                    array1.forEach((item) => {
                        item.deliverableType = deliverableType,
                            item.igtv = {
                                nanoFollowers: nanoFollowers,
                                microFollowers: microFollowers,
                                midTierFollowers: midTierFollowers,
                                macroFollowers: macroFollowers,
                                megaFollowers: megaFollowers,
                            }
                        item.save()
                            .then((result) => {
                                array.push(result)
                            })
                    })
                }
                else if (array1.length === 0) {
                    const cost = new Calculator({
                        deliverableType: deliverableType,
                        igtv: {
                            nanoFollowers: nanoFollowers,
                            microFollowers: microFollowers,
                            midTierFollowers: midTierFollowers,
                            macroFollowers: macroFollowers,
                            megaFollowers: megaFollowers,
                        }
                    })
                    cost.save()
                        .then((data) => {
                            array.push(data)
                        })
                }
                res.json(array)
            }
        })
}

exports.calculateBudget = (req, res) => {
    let { followersRange, creatorsCount, budget } = req.query;
    let reelBudget = 0;
    let postBudget = 0;
    let storyBudget = 0;
    let swipeUpBudget = 0;
    let igtvBudget = 0;
    let videoBudget = 0;
    let reachOfReel = 0;
    let LikesCommentOfReel = 0;
    let reachOfPost = 0;
    let LikesCommentOfPost = 0;
    let reachOfStory = 0;
    let LikesCommentOfStory = 0;
    let reachOfSwipeup = 0;
    let LikesCommentOfSwipeup = 0;
    let reachOfIgtv = 0;
    let LikesCommentOfIgtv = 0;
    let reachOfVideo = 0;
    let LikesCommentOfVideo = 0;

    Calculator.find()
        .then((data) => {
            data.forEach((item) => {
                if (creatorsCount && !budget) {
                    if (item.deliverableType === 'Reel') {
                        if (followersRange === 'Nano') {
                            reelBudget = creatorsCount * item.reel.nanoFollowers.budgetperFollowersRange;
                            reachOfReel = creatorsCount * item.reel.nanoFollowers.reach;
                            LikesCommentOfReel = creatorsCount * item.reel.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            reelBudget = creatorsCount * item.reel.microFollowers.budgetperFollowersRange
                            reachOfReel = creatorsCount * item.reel.microFollowers.reach;
                            LikesCommentOfReel = creatorsCount * item.reel.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            reelBudget = creatorsCount * item.reel.midTierFollowers.budgetperFollowersRange
                            reachOfReel = creatorsCount * item.reel.midTierFollowers.reach;
                            LikesCommentOfReel = creatorsCount * item.reel.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            reelBudget = creatorsCount * item.reel.macroFollowers.budgetperFollowersRange
                            reachOfReel = creatorsCount * item.reel.macroFollowers.reach;
                            LikesCommentOfReel = creatorsCount * item.reel.macroFollowers.LikesComment;
                        }

                        else if (followersRange === 'Mega') {
                            reelBudget = creatorsCount * item.reel.megaFollowers.budgetperFollowersRange
                            reachOfReel = creatorsCount * item.reel.megaFollowers.reach;
                            LikesCommentOfReel = creatorsCount * item.reel.megaFollowers.LikesComment;
                        }

                    }
                    else if (item.deliverableType === 'Post') {
                        if (followersRange === 'Nano') {
                            postBudget = creatorsCount * item.post.nanoFollowers.budgetperFollowersRange
                            reachOfPost = creatorsCount * item.post.nanoFollowers.reach;
                            LikesCommentOfPost = creatorsCount * item.post.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            postBudget = creatorsCount * item.post.microFollowers.budgetperFollowersRange
                            reachOfPost = creatorsCount * item.post.microFollowers.reach;
                            LikesCommentOfPost = creatorsCount * item.post.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            postBudget = creatorsCount * item.post.midTierFollowers.budgetperFollowersRange
                            reachOfPost = creatorsCount * item.post.midTierFollowers.reach;
                            LikesCommentOfPost = creatorsCount * item.post.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            postBudget = creatorsCount * item.post.macroFollowers.budgetperFollowersRange
                            reachOfPost = creatorsCount * item.post.macroFollowers.reach;
                            LikesCommentOfPost = creatorsCount * item.post.macroFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            postBudget = creatorsCount * item.post.megaFollowers.budgetperFollowersRange
                            reachOfPost = creatorsCount * item.post.megaFollowers.reach;
                            LikesCommentOfPost = creatorsCount * item.post.megaFollowers.LikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Story') {
                        if (followersRange === 'Nano') {
                            storyBudget = creatorsCount * item.story.nanoFollowers.budgetperFollowersRange
                            reachOfStory = creatorsCount * item.story.nanoFollowers.reach;
                            LikesCommentOfStory = creatorsCount * item.story.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            storyBudget = creatorsCount * item.story.microFollowers.budgetperFollowersRange
                            reachOfStory = creatorsCount * item.story.microFollowers.reach;
                            LikesCommentOfStory = creatorsCount * item.story.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            storyBudget = creatorsCount * item.story.midTierFollowers.budgetperFollowersRange
                            reachOfStory = creatorsCount * item.story.midTierFollowers.reach;
                            LikesCommentOfStory = creatorsCount * item.story.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            storyBudget = creatorsCount * item.story.macroFollowers.budgetperFollowersRange
                            reachOfStory = creatorsCount * item.story.macroFollowers.reach;
                            LikesCommentOfStory = creatorsCount * item.story.macroFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            storyBudget = creatorsCount * item.story.megaFollowers.budgetperFollowersRange
                            reachOfStory = creatorsCount * item.story.megaFollowers.reach;
                            LikesCommentOfStory = creatorsCount * item.story.megaFollowers.LikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Swipeup Story') {
                        if (followersRange === 'Nano') {
                            swipeUpBudget = creatorsCount * item.swipeupStory.nanoFollowers.budgetperFollowersRange
                            reachOfSwipeup = creatorsCount * item.swipeupStory.nanoFollowers.reach;
                            LikesCommentOfSwipeup = creatorsCount * item.swipeupStory.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            swipeUpBudget = creatorsCount * item.swipeupStory.microFollowers.budgetperFollowersRange
                            reachOfSwipeup = creatorsCount * item.swipeupStory.microFollowers.reach;
                            LikesCommentOfSwipeup = creatorsCount * item.swipeupStory.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            swipeUpBudget = creatorsCount * item.swipeupStory.midTierFollowers.budgetperFollowersRange
                            reachOfSwipeup = creatorsCount * item.swipeupStory.megaFollowers.reach;
                            LikesCommentOfSwipeup = creatorsCount * item.swipeupStory.megaFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            swipeUpBudget = creatorsCount * item.swipeupStory.macroFollowers.budgetperFollowersRange
                            reachOfSwipeup = creatorsCount * item.story.midTierFollowers.reach;
                            LikesCommentOfSwipeup = creatorsCount * item.story.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            swipeUpBudget = creatorsCount * item.swipeupStory.megaFollowers.budgetperFollowersRange
                            reachOfSwipeup = creatorsCount * item.swipeupStory.megaFollowers.reach;
                            LikesCommentOfSwipeup = creatorsCount * item.swipeupStory.megaFollowers.LikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Igtv') {
                        if (followersRange === 'Nano') {
                            igtvBudget = creatorsCount * item.igtv.nanoFollowers.budgetperFollowersRange
                            reachOfIgtv = creatorsCount * item.igtv.nanoFollowers.reach;
                            LikesCommentOfIgtv = creatorsCount * item.igtv.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            igtvBudget = creatorsCount * item.igtv.microFollowers.budgetperFollowersRange
                            reachOfIgtv = creatorsCount * item.igtv.microFollowers.reach;
                            LikesCommentOfIgtv = creatorsCount * item.igtv.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            igtvBudget = creatorsCount * item.igtv.midTierFollowers.budgetperFollowersRange
                            reachOfIgtv = creatorsCount * item.igtv.midTierFollowers.reach;
                            LikesCommentOfIgtv = creatorsCount * item.igtv.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            igtvBudget = creatorsCount * item.igtv.macroFollowers.budgetperFollowersRange
                            reachOfIgtv = creatorsCount * item.igtv.macroFollowers.reach;
                            LikesCommentOfIgtv = creatorsCount * item.igtv.macroFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            igtvBudget = creatorsCount * item.igtv.megaFollowers.budgetperFollowersRange
                            reachOfIgtv = creatorsCount * item.igtv.megaFollowers.reach;
                            LikesCommentOfIgtv = creatorsCount * item.igtv.megaFollowers.LikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Video') {
                        if (followersRange === 'Nano') {
                            videoBudget = creatorsCount * item.video.nanoFollowers.budgetperFollowersRange
                            reachOfVideo = creatorsCount * item.video.nanoFollowers.reach;
                            LikesCommentOfVideo = creatorsCount * item.video.nanoFollowers.LikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            videoBudget = creatorsCount * item.video.microFollowers.budgetperFollowersRange
                            reachOfVideo = creatorsCount * item.video.microFollowers.reach;
                            LikesCommentOfVideo = creatorsCount * item.video.microFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            videoBudget = creatorsCount * item.video.midTierFollowers.budgetperFollowersRange
                            reachOfVideo = creatorsCount * item.video.midTierFollowers.reach;
                            LikesCommentOfVideo = creatorsCount * item.video.midTierFollowers.LikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            videoBudget = creatorsCount * item.video.macroFollowers.budgetperFollowersRange
                            reachOfVideo = creatorsCount * item.video.macroFollowers.reach;
                            LikesCommentOfVideo = creatorsCount * item.video.macroFollowers.LikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            videoBudget = creatorsCount * item.video.megaFollowers.budgetperFollowersRange
                            reachOfVideo = creatorsCount * item.video.megaFollowers.reach;
                            LikesCommentOfVideo = creatorsCount * item.video.megaFollowers.LikesComment;
                        }
                    }
                }
                else if (budget && !creatorsCount) {
                    if (item.deliverableType === 'Reel') {
                        if (followersRange === 'Nano') {
                            // reelBudget = creatorsCount * item.reel.nanoFollowers.budgetperFollowersRange;
                            reachOfReel = item.reel.nanoFollowers.multipleForBudgetReach * budget;
                            LikesCommentOfReel = item.reel.nanoFollowers.multipleForBudgetLikesComment * budget;
                        }
                        else if (followersRange === 'Micro') {
                            // reelBudget = creatorsCount * item.reel.microFollowers.budgetperFollowersRange
                            reachOfReel = budget * item.reel.microFollowers.multipleForBudgetReach;
                            LikesCommentOfReel = budget * item.reel.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // reelBudget = creatorsCount * item.reel.midTierFollowers.budgetperFollowersRange
                            reachOfReel = budget * item.reel.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfReel = budget * item.reel.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // reelBudget = creatorsCount * item.reel.macroFollowers.budgetperFollowersRange
                            reachOfReel = budget * item.reel.macroFollowers.multipleForBudgetReach;
                            LikesCommentOfReel = budget * item.reel.macroFollowers.multipleForBudgetLikesComment;
                        }

                        else if (followersRange === 'Mega') {
                            // reelBudget = creatorsCount * item.reel.megaFollowers.budgetperFollowersRange
                            reachOfReel = budget * item.reel.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfReel = budget * item.reel.megaFollowers.multipleForBudgetLikesComment;
                        }

                    }
                    else if (item.deliverableType === 'Post') {
                        if (followersRange === 'Nano') {
                            // postBudget = creatorsCount * item.post.nanoFollowers.budgetperFollowersRange
                            reachOfPost = budget * item.post.nanoFollowers.multipleForBudgetReach;
                            LikesCommentOfPost = budget * item.post.nanoFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            // postBudget = creatorsCount * item.post.microFollowers.budgetperFollowersRange
                            reachOfPost = budget * item.post.microFollowers.multipleForBudgetReach;
                            LikesCommentOfPost = budget * item.post.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // postBudget = creatorsCount * item.post.midTierFollowers.budgetperFollowersRange
                            reachOfPost = budget * item.post.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfPost = budget * item.post.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // postBudget = creatorsCount * item.post.macroFollowers.budgetperFollowersRange
                            reachOfPost = budget * item.post.macroFollowers.multipleForBudgetReach;
                            LikesCommentOfPost = budget * item.post.macroFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            // postBudget = creatorsCount * item.post.megaFollowers.budgetperFollowersRange
                            reachOfPost = budget * item.post.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfPost = budget * item.post.megaFollowers.multipleForBudgetLikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Story') {
                        if (followersRange === 'Nano') {
                            // storyBudget = creatorsCount * item.story.nanoFollowers.budgetperFollowersRange
                            reachOfStory = budget * item.story.nanoFollowers.reach;
                            LikesCommentOfStory = budget * item.story.nanoFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            // storyBudget = creatorsCount * item.story.microFollowers.budgetperFollowersRange
                            reachOfStory = budget * item.story.microFollowers.multipleForBudgetReach;
                            LikesCommentOfStory = budget * item.story.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // storyBudget = creatorsCount * item.story.midTierFollowers.budgetperFollowersRange
                            reachOfStory = budget * item.story.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfStory = budget * item.story.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // storyBudget = creatorsCount * item.story.macroFollowers.budgetperFollowersRange
                            reachOfStory = budget * item.story.macroFollowers.multipleForBudgetReach;
                            LikesCommentOfStory = budget * item.story.macroFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            // storyBudget = creatorsCount * item.story.megaFollowers.budgetperFollowersRange
                            reachOfStory = budget * item.story.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfStory = budget * item.story.megaFollowers.multipleForBudgetLikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Swipeup Story') {
                        if (followersRange === 'Nano') {
                            // swipeUpBudget = creatorsCount * item.swipeupStory.nanoFollowers.budgetperFollowersRange
                            reachOfSwipeup = budget * item.swipeupStory.nanoFollowers.multipleForBudgetReach;
                            LikesCommentOfSwipeup = budget * item.swipeupStory.nanoFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            // swipeUpBudget = creatorsCount * item.swipeupStory.microFollowers.budgetperFollowersRange
                            reachOfSwipeup = budget * item.swipeupStory.microFollowers.multipleForBudgetReach;
                            LikesCommentOfSwipeup = budget * item.swipeupStory.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // swipeUpBudget = creatorsCount * item.swipeupStory.midTierFollowers.budgetperFollowersRange
                            reachOfSwipeup = budget * item.swipeupStory.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfSwipeup = budget * item.swipeupStory.megaFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // swipeUpBudget = creatorsCount * item.swipeupStory.macroFollowers.budgetperFollowersRange
                            reachOfSwipeup = budget * item.story.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfSwipeup = budget * item.story.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            // swipeUpBudget = creatorsCount * item.swipeupStory.megaFollowers.budgetperFollowersRange
                            reachOfSwipeup = budget * item.swipeupStory.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfSwipeup = budget * item.swipeupStory.megaFollowers.multipleForBudgetLikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Igtv') {
                        if (followersRange === 'Nano') {
                            // igtvBudget = creatorsCount * item.igtv.nanoFollowers.budgetperFollowersRange
                            reachOfIgtv = budget * item.igtv.nanoFollowers.multipleForBudgetReach;
                            LikesCommentOfIgtv = budget * item.igtv.nanoFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            // igtvBudget = creatorsCount * item.igtv.microFollowers.budgetperFollowersRange
                            reachOfIgtv = budget * item.igtv.microFollowers.multipleForBudgetReach;
                            LikesCommentOfIgtv = budget * item.igtv.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // igtvBudget = creatorsCount * item.igtv.midTierFollowers.budgetperFollowersRange
                            reachOfIgtv = budget * item.igtv.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfIgtv = budget * item.igtv.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // igtvBudget = creatorsCount * item.igtv.macroFollowers.budgetperFollowersRange
                            reachOfIgtv = budget * item.igtv.macroFollowers.multipleForBudgetReach;
                            LikesCommentOfIgtv = budget * item.igtv.macroFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            // igtvBudget = creatorsCount * item.igtv.megaFollowers.budgetperFollowersRange
                            reachOfIgtv = budget * item.igtv.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfIgtv = budget * item.igtv.megaFollowers.multipleForBudgetLikesComment;
                        }
                    }
                    else if (item.deliverableType === 'Video') {
                        if (followersRange === 'Nano') {
                            // videoBudget = creatorsCount * item.video.nanoFollowers.budgetperFollowersRange
                            reachOfVideo = budget * item.video.nanoFollowers.multipleForBudgetReach;
                            LikesCommentOfVideo = budget * item.video.nanoFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Micro') {
                            // videoBudget = creatorsCount * item.video.microFollowers.budgetperFollowersRange
                            reachOfVideo = budget * item.video.microFollowers.multipleForBudgetReach;
                            LikesCommentOfVideo = budget * item.video.microFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mid-Tier') {
                            // videoBudget = creatorsCount * item.video.midTierFollowers.budgetperFollowersRange
                            reachOfVideo = budget * item.video.midTierFollowers.multipleForBudgetReach;
                            LikesCommentOfVideo = budget * item.video.midTierFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Macro') {
                            // videoBudget = creatorsCount * item.video.macroFollowers.budgetperFollowersRange
                            reachOfVideo = budget * item.video.macroFollowers.multipleForBudgetReach;
                            LikesCommentOfVideo = budget * item.video.macroFollowers.multipleForBudgetLikesComment;
                        }
                        else if (followersRange === 'Mega') {
                            // videoBudget = creatorsCount * item.video.megaFollowers.budgetperFollowersRange
                            reachOfVideo = budget * item.video.megaFollowers.multipleForBudgetReach;
                            LikesCommentOfVideo = budget * item.video.megaFollowers.multipleForBudgetLikesComment;
                        }
                    }
                }
            })
            res.json({ reelBudget, postBudget, storyBudget, swipeUpBudget, igtvBudget, videoBudget, reachOfIgtv, reachOfReel, reachOfPost, reachOfStory, reachOfSwipeup, reachOfVideo, LikesCommentOfIgtv, LikesCommentOfPost, LikesCommentOfReel, LikesCommentOfStory, LikesCommentOfSwipeup, LikesCommentOfVideo })
        })

}