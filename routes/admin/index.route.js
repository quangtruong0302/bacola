const express = require("express");
const router = express.Router();
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const PATH = "/administrator";

module.exports = (app) => {
  app.use(`${PATH}/`, dashboardRoute);
  app.use(`${PATH}/products`, productRoute);
};
