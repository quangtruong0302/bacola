const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const categoriesSchema = new mongoose.Schema(
  {
    title: String,
    parentID: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categoriesSchema, "categories");
module.exports = Category;
