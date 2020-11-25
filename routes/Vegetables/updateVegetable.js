const express = require("express");
const router = express.Router();
const mongo = require("../../mongo_Connection");

var ObjectId = require("mongodb").ObjectID;

router.get("/", async function (req, res) {
  const db = mongo.get().collection("vegetables");

  await db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/update", function (req, res) {
  const db = mongo.get().collection("vegetables");
  const values = {
    vegetablename: req.body.veg_name,
    vegetableprice: req.body.veg_price,
    vegetablequantity: req.body.veg_quantity,
    vegetabledescription: req.body.veg_description,
    vegetableadvantage: req.body.veg_advantage,
    vegetablestatus: req.body.veg_status,
    vegetableimage: req.body.veg_image,
  };

  db.update({ _id: ObjectId(req.body.id) }, { $set: values }, function (
    err,
    result
  ) {
    if (err) throw err;
    else res.send(values.vegetablename + " has been updated.");
  });
});
module.exports = router;
