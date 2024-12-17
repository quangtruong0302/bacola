const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET] administrator/products
module.exports.product = async (req, res) => {
  try {
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

    const objSearch = searchHelper(req.query); // Tìm kiếm sản phẩm
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
    const countTrash = await Product.countDocuments({ deleted: true });
    console.log(countTrash);

    const records = await Product.find(find)
      .limit(objPagination.limitItems)
      .skip(objPagination.skip);
    res.render("admin/pages/product/product.pug", {
      pageTitle: "Quản lý Sản phẩm",
      products: records,
      search: req.query.search,
      pagination: objPagination,
      countTrash: countTrash,
    });
  } catch (error) {
    console.log(error);
  }
};

// [PATCH] administrator/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    if (req.params.status && req.params.id) {
      const status = req.params.status;
      const id = req.params.id;
      await Product.updateOne({ _id: id }, { status: status });
    }
    res.redirect("back");
  } catch (error) {}
};

// [PATCH] /administrator/products/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const listID = req.body["list-id"].split(", ");
    const actionType = req.body["action-type"];
    switch (actionType) {
      case "active":
        await Product.updateMany(
          { _id: { $in: listID } },
          { status: actionType }
        );
        break;
      case "inactive":
        await Product.updateMany(
          { _id: { $in: listID } },
          { status: actionType }
        );
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: listID } }, { deleted: true });
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
    const objSearch = searchHelper(req.query); // Tìm kiếm sản phẩm
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
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteTrash = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};
