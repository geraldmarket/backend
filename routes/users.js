const express = require("express");
const mongo = require("../mongo_Connection");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

router.post("/", async function (req, res) {
  const db = mongo.get().collection("users");

  const login = {
    emailid: req.body.emailid,
    password: req.body.password,
  };

  await db
    .find({ emailid: login.emailid, password: login.password })
    .toArray(function (err, result) {
      if (err) res.send(err);
      else {
        res.send(result);
      }
    });
});

router.post("/adduser", async function (req, res) {
  const db = mongo.get().collection("users");
  const data = {
    username: req.body.name,
    state: req.body.state,
    district: req.body.district,
    pincode: req.body.pincode,
    mobilenumber: req.body.mobileno,
    address: req.body.address,
    emaildid: req.body.email,
    landmark: req.body.landmark,
    status: "2",
    password: req.body.password,
  };
  db.find(
    { emailid: req.body.email, mobilenumber: req.body.mobileno },
    function (err, result) {
      if (result.length > 0) {
        res.send(
          "Already account exists with the same Email-Id and Mobile Number"
        );
      } else {
        db.insert(data, function (err, result) {
          if (err) throw err;
          else res.send("Your account has been added.");
        });
      }
    }
  );
});

router.post("/getuser", async function (req, res) {
  const db = mongo.get().collection("users");
  await db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/updateuser", async function (req, res) {
  const db = mongo.get().collection("users");
  const details = {
    username: req.body.username,
    state: req.body.state,
    district: req.body.district,
    pincode: req.body.pincode,
    mobilenumber: req.body.mobilenumber,
    address: req.body.address,
    emaildid: req.body.emailid,
    landmark: req.body.landmark,
  };
  await db.update(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        username: details.username,
        state: details.state,
        district: details.district,
        emaildid: details.emailid,
        pincode: details.pincode,
        mobilenumber: details.mobilenumber,
        address: details.address,
        landmark: details.landmark,
      },
    },
    function (err, result) {
      if (err) throw err;
      else res.send("Updated");
    }
  );
});


module.exports = router;
