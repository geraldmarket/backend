const express = require("express");
const router = express.Router();
const mongo = require("../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.get("/", async function (req, res) {
  const db = mongo.get().collection("orders");

  await db.find({ status: "2" }).toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/updateDelievery", async function (req, res) {
  console.log(req.body);
  const db = mongo.get().collection("orders");

  await db
    .find({ _id: ObjectId(req.body.user_id) })
    .toArray(function (err, result) {
      if (err) throw err;
      else {
        for (i = 0; i < result[0].order.length; i++) {
          if (req.body.index === i) {
            result[0].order[i].delieverydate = req.body.date;
          }
        }
        db.update(
          { _id: ObjectId(req.body.user_id) },
          { $set: { order: result[0].order } }
        );
        res.send("Updated");
      }
    });
});

module.exports = router;
