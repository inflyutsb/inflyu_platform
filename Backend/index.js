const express = require("express");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
var bodyparser = require("body-parser");
var helmet = require("helmet");
const session = require("express-session");

var cors = require('cors')

require("dotenv").config();
const Route = require("./routes/public");
const path = require('path');
require('./Controllers/Authentication/google');

/* middleware */
app.use(bodyparser.json());
app.use(express.json());
app.use(mongoSanitize());
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/", Route);
app.use("/uploads", express.static("./uploads"));

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "bla bla bla",
  })
);

app.get('/', (req, res) => {
  res.send("Socialbox Backend")
})

/* mongodb connection */
mongoose
  .connect(process.env.DATABASE)
  .then(console.log("database connected"))
  .catch((err) => {
    console.log(err);
  });

/* server */
const port = process.env.PORT;
app.listen(port, (req, res, next) => {
  console.log(`PORT is running on ${port}`);
});