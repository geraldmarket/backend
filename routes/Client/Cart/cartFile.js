const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const mongo = require("../../../mongo_Connection");
const e = require("express");

router.post("/addCart", async function (req, res) {
  const db = mongo.get().collection("users");
  const cart = {
    _id: ObjectId(),
    name: req.body.name,
    price: req.body.price,
    quantityneeded: req.body.quantityneeded,
    image: req.body.image,
    totalprice: req.body.totalprice,
  };
  await db.update(
    { _id: ObjectId(req.body.user_id) },
    { $push: { cart } },
    function (err, result) {
      if (err) throw err;
      else res.send("Item has been added to cart");
    }
  );
});

router.post("/getCart", async function (req, res) {
  const db = mongo.get().collection("users");

  await db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (err) throw err;
    else res.send(result[0].cart);
  });
});

router.post("/removeItem", async function (req, res) {
  const db = mongo.get().collection("users");
  await db.update(
    { _id: ObjectId(req.body.userid) },
    {
      $pull: { cart: { _id: ObjectId(req.body.id) } },
    },
    function (err, result) {
      if (err) throw err;
      else res.send("Item have removed from cart..");
    }
  );
});

module.exports = router;
