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
    slug: { type: String, slug: "title", unique: true },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
      },
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: {
          type: Date,
        },
      },
    ],
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categoriesSchema, "categories");
module.exports = Category;
