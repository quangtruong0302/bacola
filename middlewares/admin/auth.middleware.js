const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.session.token) {
    res.redirect("/administrator/auth/login");
  } else {
    const user = await Account.findOne({ token: req.session.token }).select(
      "-password -token"
    );
    if (!user) {
      res.redirect("/administrator/auth/login");
    } else {
      const role = await Role.findOne({ _id: user.role }).select(
        "title permissions"
      );
      res.locals.user = user;
      res.locals.role_user = role;
      next();
    }
  }
};
