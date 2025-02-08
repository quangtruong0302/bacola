module.exports.validateLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      req.flash("messageError", "Vui lòng nhập Email");
      return res.redirect("back");
    }
    if (!password) {
      req.flash("messageError", "Vui lòng nhập mật khẩu");
      return res.redirect("back");
    }
    next();
  } catch (error) {}
};
