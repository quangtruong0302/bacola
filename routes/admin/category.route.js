const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/category.controller");

const validate = require("../../validates/product.validate");

const multer = require("multer");
const upload = multer();
const uploadImageToCloudinary = require("../../middlewares/admin/uploadImageToCloudinary.helper");

router.get("/", controller.category);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadImageToCloudinary,
  validate.validateCreate,
  controller.createPOST
);
router.patch("/delete/:id", controller.delete);
router.patch("/change-status/:status/:id", controller.changeStatus);

module.exports = router;
