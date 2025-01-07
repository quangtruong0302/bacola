const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const Router = require("./routes/index.route");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const moment = require("moment");
const Database = require("./config/database");
Database.connect();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(cookieParser("bacola"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.locals.moment = moment;

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

Router(app);
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
