const UserInfo = require("../../Models/user_info");
require("dotenv").config();
const bcrypt = require("bcrypt");
const emailRegxp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const crypto = require("crypto");
const sgMail = require('@sendgrid/mail')
exports.forgot = (req, res, next) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    let { email } = req.body;
    let errors = [];
    if (!email) {
        errors.push("email required");
    }
    if (!emailRegxp.test(email)) {
        errors.push("invalid email");
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    UserInfo.findOne({ email: email }).then((user) => {
        if (!user) {
            errors.push("User With This Mail Adress Is Not Found");
            if (errors.length > 0) {
                return res.status(422).json({ errors: errors });
            }
        } else {
            user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
            user.resetPasswordExpires = Date.now() + 300000;
            user.save();
            const link1 =
                `http://13.234.125.76:3000/resetPassword/${user._id}/${user.resetPasswordToken}`;
            const msg = {
                to: email,
                from: 'shivam.rawat@acelucid.com',
                subject: 'Change Pasword',
                text: `${link1}`,
                html: `${link1}`,
            }
            sgMail
                .send(msg)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    res.json(error)
                })
            res.json(link1);
        }
    });
};

exports.resetPassword = (req, res, next) => {
    UserInfo.findById(req.params.userId).then((user) => {
        if (!user) {
            res.status(400).send("Invalid Link OR Link Expired");
        } else {
            UserInfo.findById(req.params.userId)
                .then((user) => {
                    console.log(user)
                    if (user.resetPasswordExpires > Date.now()) {
                        user.password = req.body.password;
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(user.password, salt, function (err, hash) {
                                if (err) throw err;
                                user.password = hash;
                                user.save();
                                res.status(201).send(user);
                            });
                        });
                    }
                    else {
                        res.status(401).send("Reset Password Token Expired")
                    }
                })
                .catch((err) => {
                    res.status(502).json({ errors: err });
                    console.log(err);
                })
        }
    });
};