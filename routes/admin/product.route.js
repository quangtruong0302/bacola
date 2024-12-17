const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete/:id", controller.delete);
router.get("/trash", controller.trash);
router.patch("/trash/restore/:id", controller.restore);
router.delete("/trash/delete/:id", controller.deleteTrash);

module.exports = router;
