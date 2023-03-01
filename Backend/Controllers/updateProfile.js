const UserInfo = require('../Models/user_info');

exports.editProfile = (req, res, next) => {
    let { name, email, phone, city, state, pin, designation, company, website, instagramProfile, facebookProfile, linkedInProfile, building, locality, landmark } = req.body;
    UserInfo.findById(req.params.id)
        .then((data) => {
            if (name) {
                data.name = name;
            }
            if (email) {
                data.email = email;
            }
            if (phone) {
                data.phone = phone;
            }
            if (city) {
                data.city = city;
            }
            if (state) {
                data.state = state;
            }
            if (pin) {
                data.pin = pin;
            }
            if (building) {
                data.building = building;
            }
            if (locality) {
                data.locality = locality;
            }
            if (landmark) {
                data.landmark = landmark;
            }
            if (designation) {
                data.designation = designation;
            }
            if (company) {
                data.company = company;
            }
            if (website) {
                data.website = website;
            }
            if (instagramProfile) {
                data.instagramProfile = instagramProfile;
            }
            if (linkedInProfile) {
                data.linkedInProfile = linkedInProfile;
            }
            if (facebookProfile) {
                data.facebookProfile = facebookProfile;
            }
            data.save()
                .then((result) => {
                    res.json(result)
                })
        })

}