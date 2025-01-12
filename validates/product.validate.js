const validateTitle = require("./title.validate");

module.exports.validateCreate = (req, res, next) => {
  try {
    if (validateTitle(req.body.title) == false) {
      req.flash("messageError", "Tiêu đề tối thiểu là 5 kí tự");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {}
};
