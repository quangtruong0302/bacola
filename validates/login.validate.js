const Account = require("../models/account.model");
const md5 = require("md5");

module.exports.validateLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const account = await Account.findOne({
      email: email,
    });
    if (account) {
      const newPassword = md5(password);
      if (account.password == newPassword) {
        next();
      } else {
        req.flash("messageError", "Mật khẩu không chính xác");
        return res.redirect("back");
      }
    } else {
      req.flash("messageError", "Email vừa nhập không đúng");
      return res.redirect("back");
    }
  } catch (error) {}
};
