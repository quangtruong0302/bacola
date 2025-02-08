const Role = require("../../models/role.model");

// [GET] /administrator/roles/
module.exports.role = async (req, res) => {
  const records = await Role.find({ deleted: false });
  res.render("admin/pages/role/role.pug", {
    pageTitle: "Danh sách nhóm quyền",
    roles: records,
  });
};

// [GET] /administrator/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/role/create.pug", {
    pageTitle: "Thêm mới nhóm quyền",
  });
};

// [POST] /administrator/roles/create
module.exports.createPOST = async (req, res) => {
  try {
    const record = new Role(req.body);
    await record.save();
    req.flash("messageSuccess", "Thêm mới nhóm quyền thành công");
    res.redirect("/administrator/roles");
  } catch (error) {}
};

// [GET] /administrator/roles/edit/:id
module.exports.edit = (req, res) => {
  res.render("admin/pages/role/edit.pug", {
    pageTitle: "Cập nhật nhóm quyền",
  });
};

// [GET] /administrator/roles/detail/:id
module.exports.detail = (req, res) => {
  res.send("Detail quyền");
};

// [DELETE] /administrator/roles/delete/:id
module.exports.delete = (req, res) => {
  res.send("Đã xóa");
};

// [GET] /administrator/roles/permissions
module.exports.permissions = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const roles = await Role.find(find);

    res.render("admin/pages/role/permission.pug", {
      pageTitle: "Phân quyền",
      roles: roles,
    });
  } catch (error) {}
};

// [PATCH] /administrator/roles/permissions
module.exports.permissionsPATCH = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    req.flash("messageSuccess", "Cập nhật phân quyền thành công");
    res.redirect("back");
  } catch (error) {}
};
