const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");
const validate = require("../../validates/account.validate");

const multer = require("multer");
const upload = multer();
const uploadImageToCloudinary = require("../../middlewares/admin/uploadImageToCloudinary.helper");

router.get("/", controller.account);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadImageToCloudinary,
  validate.validateName,
  validate.validatePhone,
  validate.validateEmail,
  validate.validatePassword,
  controller.createPOST
);

// router.post(
//   "/create",
//   upload.single("thumbnail"),
//   uploadImageToCloudinary,
//   controller.createPOST
// );

module.exports = router;
