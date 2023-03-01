const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const UserInfo = require("../../Models/user_info");
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      const user = new UserInfo({
        // id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        source: "google",
      });
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
        expiresIn: "1d",
      });
      user.token = token;
      UserInfo.findOne({ email: user.email })
        .then((data) => {
          if (data) {
            UserInfo.updateOne({}, { token: token, source: "google" }).then(
              (info) => {}
            );
            done(null, data);
          } else {
            data = UserInfo.create(user);
            done(null, data);
          }
        })
        .catch((error) => {
          res.status(500).json({ err: error });
        });
    }
  )
);