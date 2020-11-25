const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");
const ObjectId = require("mongodb").ObjectID;

router.post("/profileupdate", async function (req, res) {
  const db = mongo.get().collection("users");
  await db.update(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        username: req.body.username,
        mobilenumber: req.body.mobilenumber,
        emailid: req.body.emailid,
      },
    },
    function (err, result) {
      if (err) throw err;
      else res.send("Profile has been updated");
    }
  );
});

router.post("/deleteprofile", async function (req, res) {
  const db = mongo.get().collection("users");

  await db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (result[0].password === req.body.password) {
      db.deleteOne({ _id: ObjectId(req.body.id) }, function (err, result) {
        if (err) throw err;
        else
          res.json({
            message:
              "Your account has been deleted \n Hope you find us soon.....",
            status: 1,
          });
      });
    } else {
      res.json({ message: "Incorrect password... \n Try again.!", status: 0 });
    }
  });
});

router.post("/updateaddress", async function (req, res) {
  const db = mongo.get().collection("users");
  await db.update(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        address: req.body.address,
        state: req.body.state,
        pincode: req.body.pincode,
        district: req.body.district,
        landmark: req.body.landmark,
      },
    },
    function (err, result) {
      if (err) throw err;
      else res.send("Address has been updated");
    }
  );
});

module.exports = router;
