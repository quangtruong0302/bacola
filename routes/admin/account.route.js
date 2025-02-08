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
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadImageToCloudinary,
  controller.editPATCH
);

module.exports = router;
