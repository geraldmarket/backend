const express = require("express");
const router = express.Router();

const mongo = require("../../mongo_Connection");

router.post("/", async function (req, res) {
  var message = [];

  const db = mongo.get().collection("vegetables");

  const addVegetables = {
    vegetablename: req.body.veg_name,
    vegetableprice: req.body.veg_price,
    vegetablequantity: req.body.veg_quantity,
    vegetabledescription: req.body.veg_description,
    vegetableadvantage: req.body.veg_advantage,
    vegetablestatus: req.body.veg_status,
    vegetableimage: req.body.veg_image,
  };

  await db
    .find({ vegetablename: addVegetables.vegetablename })
    .toArray((err, results) => {
      var output = results.map((item) => {
        return item.vegetablename;
      });
      if (output.length === 0) {
        db.insert(addVegetables);
        message.push({
          status: 2,
          message:
            addVegetables.vegetablename + " has been added to the database",
        });
      } else {
        for (var i = 0; i < output.length; i++) {
          if (output[i] === addVegetables.vegetablename) {
            message.push({
              status: 1,
              message:
                addVegetables.vegetablename +
                " has already been added in the database.",
            });
            break;
          }
        }
      }
      res.send(message);
    });
});

module.exports = router;
