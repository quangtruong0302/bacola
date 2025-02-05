const express = require("express");
const router = express.Router();
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const PATH = "/administrator";

module.exports = (app) => {
  app.use(`${PATH}/`, dashboardRoute);
  app.use(`${PATH}/products`, productRoute);
  app.use(`${PATH}/categories`, categoryRoute);
  app.use(`${PATH}/roles`, roleRoute);
  app.use(`${PATH}/accounts`, accountRoute);
  app.use(`${PATH}/auth`, authRoute);
};
