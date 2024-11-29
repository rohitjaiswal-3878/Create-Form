const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const formRoute = require("./routes/form.route");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/form", formRoute);

app.use((err, req, res, next) => {
  const log = `\n\n ${req.url} - ${
    req.method
  } - ${new Date().toISOString()} \n ${err.stack}`;
  fs.appendFile("error.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res
    .status(500)
    .json({ msg: "Something went wrong on server!", err: err.stack });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, (err) => {
      if (!err) {
        console.log(`Server is up on port ${PORT}`);
      }
    });
  })
  .catch((err) => console.log(err));
