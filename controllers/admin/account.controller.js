const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const generateToken = require("../../helpers/generateToken.helper");
const md5 = require("md5");

module.exports.account = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const accounts = await Account.find(find).select("-password -token");
    for (const account of accounts) {
      if (account.role) {
        const role = await Role.findOne({
          _id: account.role,
        });
        if (role) {
          account.roleTitle = role.title;
        } else {
          account.roleTitle = "Chưa cập nhật";
        }
      } else {
        account.roleTitle = "Chưa cập nhật";
      }
    }
    res.render("admin/pages/account/account.pug", {
      pageTitle: "Danh sách tài khoản",
      accounts: accounts,
    });
  } catch (error) {}
};

module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/create.pug", {
    pageTitle: "Thêm mới tài khoản",
    roles: roles,
  });
};

module.exports.createPOST = async (req, res) => {
  try {
    const emailExist = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("messageError", "Email đã tồn tại");
      res.redirect("back");
    } else {
      req.body.password = md5(req.body.password);
      delete req.body.confirmPassword;
      req.body.token = generateToken();
      const account = new Account(req.body);
      await account.save();
      req.flash("messageSuccess", "Tạo tài khoản thành công");
      res.redirect("/administrator/accounts");
    }
  } catch (error) {}
};
