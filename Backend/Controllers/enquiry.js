const Enquiry = require('../Models/enquiry');
const emailRegxp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


exports.submitQuery = (req, res, next) => {
    let { firstName,
        lastName,
        phone,
        email,
        message,
        estimatedLikes,
        estimatedComment,
        estimatedReach,
        estimatedBudget,
        estimatedLikesComment,
        creatorsCount } = req.body;
    let errors = [];
    if (!emailRegxp.test(email)) {
        errors.push("invalid email");
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    const enquiry = new Enquiry({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        estimatedBudget: estimatedBudget,
        estimatedReach: estimatedReach,
        creatorsCount: creatorsCount,
        estimatedLikesComment: estimatedLikesComment
    })
    enquiry.save()
        .then((data) => {
            res.status(200).json(data)
        })
}