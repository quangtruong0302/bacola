const Category = require("../../models/category.model");
const createTreeHelper = require("../../helpers/createTree.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const Product = require("../../models/product.model");
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
  const countCategory = await Category.countDocuments(find);
  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 6,
    },
    countCategory,
    req.query
  );
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
  const [sortKey, sortValue] = Object.entries(sort)[0] || [];
  const records = await Category.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  for (const category of records) {
    if (category.parentID != "") {
      const parentCaterory = await Category.findOne({
        _id: category.parentID,
      });
      if (parentCaterory) {
        category.parentTitle = parentCaterory.title;
      }
    }
    const countProduct = await Product.countDocuments({
      category: category.id,
    });
    if (countProduct) {
      category.countProduct = countProduct;
    }
  }
  res.render("admin/pages/category/category.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: records,
    pagination: objPagination,
    sortKey: sortKey,
    sortValue: sortValue,
  });
};
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const records = await Category.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/category/create.pug", {
    pageTitle: "Thêm danh mục",
    categories: newRecords,
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

module.exports.edit = async (req, res) => {
  try {
    const record = await Category.findOne({ _id: req.params.id });
    const records = await Category.find({ deleted: false, status: "active" });
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      categories: newRecords,
      category: record,
    });
  } catch (error) {}
};
module.exports.editPATCH = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    console.log(req.body);
    await Category.updateOne({ _id: req.params.id }, { ...req.body });
    req.flash("messageSuccess", "Cập nhật thông tin danh mục thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("messageError", "Cập nhật thông tin sản phẩm thất bại");
    res.redirect("back");
  }
};
