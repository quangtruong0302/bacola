module.exports.validateName = (req, res, next) => {
  try {
    const fullName = req.body.fullName;
    if (!fullName || fullName.trim().length < 3) {
      req.flash("messageError", "Họ tên phải có ít nhất 3 ký tự");
      return res.redirect("back");
    }

    const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/;
    if (!nameRegex.test(fullName)) {
      req.flash(
        "messageError",
        "Họ tên không được chứa ký tự đặc biệt hoặc số"
      );
      return res.redirect("back");
    }
    next();
  } catch (error) {
    console.error("Lỗi trong validateName:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};

module.exports.validatePhone = (req, res, next) => {
  try {
    const phone = req.body.phone;
    if (!phone) {
      req.flash("messageError", "Vui lòng nhập số điện thoại");
      return res.redirect("back");
    }
    const phoneRegex = /^(0[1-9][0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      req.flash(
        "messageError",
        "Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng số 0)"
      );
      return res.redirect("back");
    }

    next();
  } catch (error) {
    console.error("Lỗi trong validatePhone:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};

module.exports.validateEmail = (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      req.flash("messageError", "Vui lòng nhập email");
      return res.redirect("back");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      req.flash("messageError", "Email không hợp lệ");
      return res.redirect("back");
    }
    next();
  } catch (error) {
    console.error("Lỗi trong validateEmail:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};

module.exports.validatePassword = (req, res, next) => {
  try {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password) {
      req.flash("messageError", "Vui lòng nhập mật khẩu");
      return res.redirect("back");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      req.flash(
        "messageError",
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return res.redirect("back");
    }

    if (password != confirmPassword) {
      req.flash("messageError", "Mật khẩu không trùng khớp");
      return res.redirect("back");
    }

    next();
  } catch (error) {
    console.error("Lỗi trong validatePassword:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};
