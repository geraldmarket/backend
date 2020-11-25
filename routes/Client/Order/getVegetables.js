const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.get("/", function (req, res) {
  const db = mongo.get().collection("vegetables");

  db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.get("/onevegetable/:id", async function (req, res) {
  const db = mongo.get().collection("vegetables");

  await db
    .find({ _id: ObjectId(req.params.id) })
    .toArray(function (err, result) {
      if (err) throw err;
      else if (result.length === 0) {
        res.send("error");
      } else res.send(result);
    });
});

module.exports = router;
