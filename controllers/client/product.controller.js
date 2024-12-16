const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
      status: "active",
    };
    const records = await Product.find(find);
    res.render("client/pages/product/product.pug", {
      pageTitle: "Danh sách sản phẩm",
      products: records,
    });
  } catch (error) {
    console.log(error);
  }
};
