const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
module.exports.connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connection successful !!!");
  } catch (error) {
    console.log("Database connection failed !!!");
  }
};
