const express = require("express");
const mongo = require("../../../mongo_Connection");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const ObjectID = require("mongodb").ObjectID;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "geraldfreshmarket@gmail.com",
    pass: "GfM$1972",
  },
});

router.post("/", function (req, res) {
  const db = mongo.get().collection("users");
  crypto.randomBytes(32, (err, buffer) => {
    if (err) throw err;
    const token = buffer.toString("hex");
    var mailOptions = {
      to: req.body.emailid,
      from: "no-reply@of.com",
      subject: "Password Reset",
      html: `<p>You requested for password reset</p>
    <h3>Click in this <a href="http://localhost:3000/new-password/${token}">link</a> to reset password</h3>`,
    };
    db.find({ emailid: req.body.emailid }).toArray(function (error, result) {
      if (error) throw error;
      else if (result.length === 0) {
        res.send("User Not Found....");
      } else {
        db.findOneAndUpdate(
          { _id: ObjectID(result[0]._id) },
          {
            $set: {
              token: token,
              expireToken: Date.now() + 3600000,
            },
          },
          function (e, r) {
            if (e) throw e;
            else {
              transporter.sendMail(mailOptions, function (f, s) {
                if (f) throw f;
                else res.send("Check your mail");
              });
            }
          }
        );
      }
    });
  });
});

router.post("/new-password", function (req, res) {
  const db = mongo.get().collection("users");

  db.find({ token: req.body.token, expireToken: { $gt: Date.now() } }).toArray(
    function (err, result) {
      if (result.length === 0) {
        res.send("Try again... Session has expired");
      } else if (err) throw err;
      else {
        db.update(
          { _id: ObjectID(result[0]._id) },
          {
            $set: {
              password: req.body.newpassword,
            },
            $unset: {
              token: "",
              expireToken: "",
            },
          },
          function (failure, success) {
            if (failure) throw failure;
            else res.send("Password updated successfully.....");
          }
        );
      }
    }
  );
});
module.exports = router;
