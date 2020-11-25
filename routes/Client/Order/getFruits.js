const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.get("/", function (req, res) {
  const db = mongo.get().collection("fruits");

  db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.get("/onefruit/:id", async function (req, res) {
    const db = mongo.get().collection("fruits");
  
    await db
      .find({ _id: ObjectId(req.params.id) })
      .toArray(function (err, result) {
        if (err) throw err;
        else res.send(result);
      });
  });

module.exports = router;
