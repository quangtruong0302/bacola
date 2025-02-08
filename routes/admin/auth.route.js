const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller.js");
const validate = require("../../validates/login.validate.js");

router.get("/login", controller.login);
router.post("/login", validate.validateLogin, controller.loginPOST);
router.get("/logout", controller.logout);

module.exports = router;
