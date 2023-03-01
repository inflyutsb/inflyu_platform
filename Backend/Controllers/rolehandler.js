const jwt = require("jsonwebtoken");
const UserInfo = require("../Models/user_info");
const { roles } = require("../roles");

exports.grantAccess = function (action, resource) {
  return (req, res, next) => {
    if (req.headers["x-access-token"]) {
      const token = req.headers["x-access-token"];
      const { userId, exp } = jwt.verify(token, process.env.TOKEN);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      UserInfo.findById(userId).then((data) => {
        if (!data)
          return res.status(401).json({
            error: "You need to be logged in to access this route",
          });
        else {
          req.data = data;
          const permission = roles.can(data.role)[action](resource);
          if (!permission.granted) {
            return res.status(401).json({
              error: "You don't have enough permission to perform this action",
            });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    }
  };
};
