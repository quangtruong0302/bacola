const crypto = require("crypto");

module.exports = () => {
  return crypto.randomBytes(15).toString("hex").slice(0, 30);
};
