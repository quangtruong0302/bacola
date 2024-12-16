const express = require("express");
const app = express();
const Router = require("./routes/index.route");
require("dotenv").config();

const Database = require("./config/database");
Database.connect();

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

Router(app);

app.listen(process.env.PORT, () => {
  console.log(`Application runing on Port: ${process.env.PORT}`);
  console.log(`Link: http://localhost:${process.env.PORT}`);
});
