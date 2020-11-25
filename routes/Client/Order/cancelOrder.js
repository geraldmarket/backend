const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.post("/", async function (req, res) {
  const db = mongo.get().collection("users");
  console.log(req.body);
  await db.update(
    { _id: ObjectId(req.body.id) },
    { $pull: { order: { id: ObjectId(req.body.item_id) } } },
    { multi: false },
    function (err, result) {
      if (err) throw err;
      else res.send("Item has been removed");
    }
  );
});

module.exports = router;
