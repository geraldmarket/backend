const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.post("/", async function (req, res) {
  const db = mongo.get().collection("users");
  const db1 = mongo.get().collection("orders");
  var i;

  for (var i = 0; i < req.body.order.length; i++) {
    const order = {
      id: ObjectId(),
      name: req.body.order[i].name,
      price: req.body.order[i].price,
      quantityneeded: req.body.order[i].quantityneeded,
      image: req.body.order[i].image,
      totalprice: req.body.order[i].totalprice,
      delieverydate: req.body.delieverydate,
    };
    db.find({ _id: ObjectId(req.body.user_id) }).toArray(function (
      err,
      result
    ) {
      if (err) throw err;
      else {
        db1
          .find({ _id: ObjectId(req.body.user_id) })
          .toArray(function (err, results) {
            if (results.length > 0) {
              db1.update(
                { _id: ObjectId(req.body.user_id) },
                {
                  $set: {
                    emailid: result[0].emailid,
                    status: result[0].status,
                    address:
                      result[0].address +
                      "," +
                      result[0].district +
                      "," +
                      result[0].state +
                      "," +
                      result[0].pincode,
                    landmark: result[0].landmark,
                    mobile_number: result[0].mobilenumber,
                  },
                  $push: { order },
                }
              );
              db.update(
                { _id: ObjectId(req.body.user_id) },
                { $push: { order } },
                function (err, result) {
                  if (err) result = err;
                }
              );
            } else {
              db1.insert({
                _id: ObjectId(req.body.user_id),
                emailid: result[0].emailid,
                address:
                  result[0].address +
                  "," +
                  result[0].district +
                  "," +
                  result[0].state +
                  "," +
                  result[0].pincode,
                landmark: result[0].landmark,
                mobile_number: result[0].mobilenumber,
                order: [order],
              });
            }
          });
      }
    });
  }
  res.send("Orders have been placed");
});

module.exports = router;
