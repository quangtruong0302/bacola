const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.role);
router.get("/create", controller.create);
router.post("/create", controller.createPOST);
router.patch("/delete/:id", controller.delete);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);
router.get("/permissions", controller.permissions);
router.patch("/permissions", controller.permissionsPATCH);

module.exports = router;
