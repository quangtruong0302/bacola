const Product = require("../../models/product.model");

module.exports.dashboard = async (req, res) => {
  try {
    res.render("admin/pages/dashboard/dashboard.pug", {
      pageTitle: "Dashboard",
    });
  } catch (error) {}
};
