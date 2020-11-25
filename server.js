const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");

const mongo = require("./mongo_Connection");
const routes = require("./routes/index");

var port = process.env.PORT || 8000;

app.use(express.json({ limit: "100mb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongo.connect(function (err, client) {
  if (err) console.log(err);
  else console.log("Mongodb has been connected");
});

app.use("/organic", routes);

app.listen(port, () => console.log(`App running on port ${port}`));
