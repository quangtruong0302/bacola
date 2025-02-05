const Account = require("../../models/account.model");
const md5 = require("md5");

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login.pug");
};

module.exports.loginPOST = async (req, res) => {
  res.render("admin/pages/dashboard/dashboard.pug");
};
