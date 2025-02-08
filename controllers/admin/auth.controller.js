const Account = require("../../models/account.model");
const md5 = require("md5");

// [GET] /administrator/auth/login
module.exports.login = (req, res) => {
  // if (req.cookies.token) {
  //   res.redirect("/administrator/dashboard");
  // } else {
  //   res.render("admin/pages/auth/login.pug");
  // }
  if (req.session.token) {
    res.redirect("/administrator/dashboard");
  } else {
    res.render("admin/pages/auth/login.pug");
  }
};

// [POST] /administrator/auth/login
module.exports.loginPOST = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const account = await Account.findOne({
      email: email,
    });
    if (account) {
      const newPassword = md5(password);
      if (account.password == newPassword) {
        // res.cookie("token", account.token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "Strict",
        // });
        req.session.token = account.token;
        res.redirect("/administrator/dashboard");
      } else {
        req.flash("messageError", "Mật khẩu không chính xác");
        return res.redirect("back");
      }
    } else {
      req.flash("messageError", "Email vừa nhập không đúng");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
  }
};

// [GET] /administrator/auth/logout
module.exports.logout = (req, res) => {
  try {
    // res.clearCookie("token");
    req.session.destroy();
    res.redirect("/administrator/auth/login");
  } catch (error) {}
};
