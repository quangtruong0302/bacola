const express = require("express");
const router = express.Router();
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const middleware = require("../../middlewares/admin/auth.middleware");
const PATH = "/administrator";

module.exports = (app) => {
  app.use(`${PATH}/dashboard`, middleware.requireAuth, dashboardRoute);
  app.use(`${PATH}/products`, middleware.requireAuth, productRoute);
  app.use(`${PATH}/categories`, middleware.requireAuth, categoryRoute);
  app.use(`${PATH}/roles`, middleware.requireAuth, roleRoute);
  app.use(`${PATH}/accounts`, middleware.requireAuth, accountRoute);
  app.use(`${PATH}/auth`, authRoute);
};
