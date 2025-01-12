const Role = require("../../models/role.model");

module.exports.role = async (req, res) => {
  const records = await Role.find({ deleted: false });
  res.render("admin/pages/role/role.pug", {
    pageTitle: "Danh sách nhóm quyền",
    roles: records,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/role/create.pug", {
    pageTitle: "Thêm mới nhóm quyền",
  });
};

module.exports.createPOST = async (req, res) => {
  try {
    const record = new Role(req.body);
    await record.save();
    req.flash("messageSuccess", "Thêm mới nhóm quyền thành công");
    res.redirect("/administrator/roles");
  } catch (error) {}
};

module.exports.edit = (req, res) => {
  res.render("admin/pages/role/edit.pug", {
    pageTitle: "Cập nhật nhóm quyền",
  });
};
module.exports.detail = (req, res) => {
  res.send("Detail quyền");
};

module.exports.delete = (req, res) => {
  res.send("Đã xóa");
};

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
