const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/product.validate");

// Upload image to local
const multer = require("multer");
const storage = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storage() });

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete/:id", controller.delete);
router.get("/trash", controller.trash);
router.patch("/trash/restore/:id", controller.restore);
router.delete("/trash/delete/:id", controller.deleteTrash);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.validateCreate,
  controller.createPOST
);
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.validateCreate,
  controller.editPATCH
);

module.exports = router;
