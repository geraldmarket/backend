const express = require("express");
const router = express.Router();
const mongo = require("../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.get("/", function (req, res) {
  const db = mongo.get().collection("fruits");

  db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/delete", function (req, res) {
  const db = mongo.get().collection("fruits");
  db.deleteOne({ _id: ObjectId(req.body.id) }, function (err, result) {
    if (err) throw err;
    else res.send("Your item has been deleted.");
  });
});

module.exports = router;
