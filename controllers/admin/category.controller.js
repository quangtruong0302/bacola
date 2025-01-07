const Category = require("../../models/category.model");
module.exports.category = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    if (req.query.status == "active") {
      find.status = "active";
    }
    if (req.query.status == "inactive") {
      find.status = "inactive";
    }
  }
  const sort = {};
  if (req.query["sort-key"] && req.query["sort-value"]) {
    let sortKey = req.query["sort-key"];
    let sortValue = req.query["sort-value"];
    sort[sortKey] = sortValue;
  } else {
    let sortKey = "createdAt";
    let sortValue = "desc";
    sort[sortKey] = sortValue;
  }
  // Destructuring đúng cách từ đối tượng
  const [sortKey, sortValue] = Object.entries(sort)[0] || []; // Lấy cặp key-value đầu tiên nếu có
  const records = await Category.find(find).sort(sort);
  res.render("admin/pages/category/category.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: records,
    sortKey: sortKey,
    sortValue: sortValue,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/category/create.pug", {
    pageTitle: "Thêm danh mục",
  });
};

module.exports.createPOST = async (req, res) => {
  try {
    const record = new Category(req.body);
    await record.save();
    req.flash("messageSuccess", "Thêm danh mục thành công");
    res.redirect("/administrator/categories");
  } catch (error) {}
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.updateOne({ _id: id }, { deleted: true });
    req.flash("messageSuccess", "Xóa danh mục thành công");
    res.redirect("back");
  } catch (error) {}
};

module.exports.changeStatus = async (req, res) => {
  try {
    if (req.params.status && req.params.id) {
      const status = req.params.status;
      const id = req.params.id;
      await Category.updateOne(
        { _id: id },
        { status: status, updatedAt: Date.now() }
      );
    }
    req.flash("messageSuccess", "Cập nhật trạng thái danh mục thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("messageError", "Cập nhật trạng thái thất bại");
  }
};
