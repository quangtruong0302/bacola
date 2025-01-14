const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const searchHelper = require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.product = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const findCategory = {
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
    if (req.query.category && req.query.category != "all") {
      find.category = req.query.category;
    }

    const objSearch = searchHelper(req.query); // Tìm kiếm sản phẩm
    if (objSearch.regex) {
      find.title = objSearch.regex;
    }
    if (req.query.category) {
      find.category = req.query.category;
      if (req.query.category == "all") {
        delete find.category;
      }
    }
    const categories = await Category.find({
      deleted: false,
      status: "active",
    });
    const newCategories = createTreeHelper.tree(categories);
    let category = {};
    if (req.query.category != "all") {
      category = await Category.findOne({ _id: req.query.category });
    } else {
      category.title = "Tất cả danh mục";
    }

    const countProduct = await Product.countDocuments(find);
    const objPagination = paginationHelper(
      {
        currentPage: 1,
        limitItems: 6,
      },
      countProduct,
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
    const countTrash = await Product.countDocuments({ deleted: true });
    const records = await Product.find(find)
      .limit(objPagination.limitItems)
      .skip(objPagination.skip)
      .sort(sort);
    for (const product of records) {
      if (product.category) {
        const category = await Category.findOne({
          _id: product.category,
        });
        if (category) {
          product.categoryTitle = category.title;
        } else {
          product.categoryTitle = "Chưa cập nhật";
        }
      } else {
        product.categoryTitle = "Chưa cập nhật";
      }
    }
    res.render("admin/pages/product/product.pug", {
      pageTitle: "Danh sách sản phẩm",
      products: records,
      search: req.query.search,
      pagination: objPagination,
      countTrash: countTrash,
      sortKey: sortKey,
      sortValue: sortValue,
      categories: newCategories,
      countProduct: countProduct,
      category: category,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    if (req.params.status && req.params.id) {
      const status = req.params.status;
      const id = req.params.id;
      await Product.updateOne(
        { _id: id },
        { status: status, updatedAt: Date.now() }
      );
    }
    req.flash("messageSuccess", "Cập nhật trạng thái thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("messageError", "Cập nhật trạng thái thất bại");
  }
};

module.exports.changeMulti = async (req, res) => {
  try {
    const listID = req.body["list-id"].split(", ");
    const actionType = req.body["action-type"];
    switch (actionType) {
      case "active":
        await Product.updateMany(
          { _id: { $in: listID } },
          { status: actionType, updatedAt: Date.now() }
        );
        req.flash(
          "messageSuccess",
          `Cập nhật trạng thái ${listID.length} sản phẩm thành công`
        );
        break;
      case "inactive":
        await Product.updateMany(
          { _id: { $in: listID } },
          { status: actionType, updatedAt: Date.now() }
        );
        req.flash(
          "messageSuccess",
          `Cập nhật trạng thái ${listID.length} sản phẩm thành công`
        );
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: listID } }, { deleted: true });
        req.flash("messageSuccess", `Xóa ${listID.length} sản phẩm thành công`);
        break;
      default:
        break;
    }
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: true });
    req.flash("messageSuccess", `Xóa sản phẩm thành công`);
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.trash = async (req, res) => {
  try {
    const find = {
      deleted: true,
    };
    if (req.query.status) {
      if (req.query.status == "active") {
        find.status = "active";
      }
      if (req.query.status == "inactive") {
        find.status = "inactive";
      }
    }
    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
      find.title = objSearch.regex;
    }
    const countProduct = await Product.countDocuments(find);
    const objPagination = paginationHelper(
      {
        currentPage: 1,
        limitItems: 6,
      },
      countProduct,
      req.query
    );

    const records = await Product.find(find)
      .limit(objPagination.limitItems)
      .skip(objPagination.skip);
    res.render("admin/pages/trash/trash.pug", {
      pageTitle: "Thùng rác",
      products: records,
      search: req.query.search,
      pagination: objPagination,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.restore = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: false });
    req.flash("messageSuccess", `Khôi phục sản phẩm thành công`);
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteTrash = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    req.flash("messageSuccess", `Xóa sản phẩm thành công`);
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const categories = await Category.find(find);
  const newCategories = createTreeHelper.tree(categories);
  res.render("admin/pages/product/create.pug", {
    pageTitle: "Thêm sản phẩm",
    categories: newCategories,
  });
};

module.exports.createPOST = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (!req.file) {
      req.body.thumbnail = `/uploads/loading.png`;
    }
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      req.body.position =
        (await Product.countDocuments({ deleted: false })) + 1;
    }
    const record = new Product(req.body);
    await record.save();
    req.flash("messageSuccess", "Thêm sản phẩm thành công");
    res.redirect("/administrator/products");
  } catch (error) {}
};

module.exports.detail = async (req, res) => {
  try {
    const record = await Product.findOne({ _id: req.params.id });
    if (record.category) {
      const category = await Category.findOne({
        _id: record.category,
      });
      record.categoryTitle = category.title;
    }

    res.render("admin/pages/product/detail.pug", {
      pageTitle: record.title,
      product: record,
    });
  } catch (error) {}
};

module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      status: "active",
    };
    const categories = await Category.find(find);
    const newCategories = createTreeHelper.tree(categories);
    const record = await Product.findOne({ _id: req.params.id });
    res.render("admin/pages/product/edit.pug", {
      pageTitle: record.title,
      product: record,
      categories: newCategories,
    });
  } catch (error) {
    req.flash("messageError", "Đã xãy ra lỗi, vui lòng thử lại");
    res.redirect("/administrator/products");
  }
};

module.exports.editPATCH = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    req.body.updatedAt = Date.now();
    await Product.updateOne({ _id: req.params.id }, { ...req.body });
    req.flash("messageSuccess", "Cập nhật thông tin sản phẩm thành công");
    res.redirect("back");
  } catch (error) {
    console.log(error);
    req.flash("messageError", "Đã xãy ra lỗi, vui lòng thử lại sau");
    res.redirect("back");
  }
};
