const express = require("express");
const router = express.Router();
const mongo = require("../../mongo_Connection");
var path = require("path");
var multer = require("multer");
var fs = require("fs");
var ObjectId = require("mongodb").ObjectID;

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "././uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get("/", async function (req, res) {
  const db = mongo.get().collection("fruits");

  await db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/update", upload.single("image"), function (req, res) {
  const db = mongo.get().collection("fruits");

  var image = fs.readFileSync(req.file.path);
  var final_image = image.toString("base64");

  const values = {
    fruitname: req.body.name,
    fruitprice: req.body.price,
    fruitquantity: req.body.quantity,
    fruitdescription: req.body.description,
    fruitimage: new Buffer.from(final_image, "base64"),
  };

  db.update({ _id: ObjectId(req.body.id) }, { $set: values }, function (
    err,
    result
  ) {
    if (err) throw err;
    else res.send(values.fruitname + " has been updated.");
  });
});
module.exports = router;
