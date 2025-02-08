const Product = require("../../models/product.model");

// [GET] /administrator/dashboard
module.exports.dashboard = async (req, res) => {
  try {
    res.render("admin/pages/dashboard/dashboard.pug", {
      pageTitle: "Dashboard",
    });
  } catch (error) {}
};
