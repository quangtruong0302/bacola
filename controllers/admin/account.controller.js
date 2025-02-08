const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const generateToken = require("../../helpers/generateToken.helper");
const md5 = require("md5");

// [GET] /administrator/accounts/
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

// [GET] /administrator/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/create.pug", {
    pageTitle: "Thêm mới tài khoản",
    roles: roles,
  });
};

// [PATCH] /administrator/accounts/create
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
      req.body.createdBy = {
        account_id: res.locals.user.id,
        createdAt: Date.now(),
      };
      const account = new Account(req.body);
      await account.save();
      req.flash("messageSuccess", "Tạo tài khoản thành công");
      res.redirect("/administrator/accounts");
    }
  } catch (error) {}
};

// [GET] /administrator/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id }).select(
      "-password -token"
    );
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/account/edit.pug", {
      pageTitle: "Cập nhật tài khoản",
      account: account,
      roles: roles,
    });
  } catch (error) {}
};

// [PATCH] /administrator/accounts/edit/:id
module.exports.editPATCH = async (req, res) => {
  try {
    const id = req.params.id;
    const emailExist = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("messageError", "Email đã tồn tại");
    } else {
      delete req.body.confirmPassword;
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Account.updateOne(
        { _id: id },
        {
          ...req.body,
          $push: {
            updatedBy: {
              account_id: res.locals.user.id,
              updatedAt: Date.now(),
            },
          },
        }
      );
      req.flash("messageSuccess", "Cập nhật thành công");
    }
    res.redirect("back");
  } catch (error) {}
};
