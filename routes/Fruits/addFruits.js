const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongo = require("../../mongo_Connection");

const storgae = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "././uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        " - " +
        Date.now() +
        "- " +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storgae });

router.post("/", upload.single("image"), async function (req, res) {
  var message = [];

  const db = mongo.get().collection("fruits");
  var file = fs.readFileSync(req.file.path);
  var image = file.toString("base64");
  const addFruits = {
    fruitname: req.body.name,
    fruitprice: req.body.price,
    fruitquantity: req.body.quantity,
    fruitdescription: req.body.description,
    fruitimage: new Buffer.from(image, "base64"),
  };
  if (req.file.size >= 1200000) {
    message.push({ status: 1, message: "The image size is more than 1mb" });
  } else {
    await db
      .find({ fruitname: addFruits.fruitname })
      .toArray((err, results) => {
        var output = results.map((item) => {
          return item.fruitname;
        });
        if (output.length === 0) {
          db.insert(addFruits);
          message.push({
            status: 2,
            message:
              addFruits.fruitname + " has been added to the database",
          });
        } else {
          for (var i = 0; i < output.length; i++) {
            if (output[i] === addFruits.fruitname) {
              message.push({
                status: 1,
                message:
                  addFruits.fruitname +
                  " has already been added in the database.",
              });
            } else {
              db.insert(addFruits);
              message.push({
                status: 2,
                message:
                  addFruits.fruitname +
                  " has been added to the database",
              });
            }
          }
        }
        res.send(message);
      });
  }
});

module.exports = router;
