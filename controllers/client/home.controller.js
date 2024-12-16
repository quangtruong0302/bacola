const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const product = await Product.find();
  console.log(product);
  res.render("client/pages/home/home.pug", {
    pageTitle: "Trang chủ",
  });
};
