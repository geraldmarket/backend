const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const mongo = require("../../../mongo_Connection");

router.post("/", function (req, res) {
  const db = mongo.get().collection("users");

  db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (err) throw err;
    else {
      res.json({ details: result});
    }
  });
});

router.post("/get-order", function (req, res) {
  const db = mongo.get().collection("users");

  db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (err) throw err;
    else {
      res.json({ details: result[0].order});
    }
  });
});

module.exports = router;
