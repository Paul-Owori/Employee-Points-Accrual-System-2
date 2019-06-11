const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Finance = require("../models/Finance");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  Finance.find()
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//To signup a new finance personnel
router.post("/signup", (req, res, next) => {
  let finance = new Finance();

  finance.finance_firstName = req.body.firstName;
  finance.finance_lastName = req.body.lastName;
  finance.finance_email = req.body.email;
  finance.setPassword(req.body.password);

  //This saves the finance personnel in the database
  finance
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//To login a finance personnel
router.post("/signin", (req, res) => {
  // find finance personnel with requested email
  //receives two parameters, email and password
  Finance.findOne({ finance_email: req.body.email }, function(err, finance) {
    if (finance === null) {
      return res.status(404).send({
        message: "User not found."
      });
    } else {
      if (finance.validPassword(req.body.password)) {
        return res.status(200).send({
          _id: finance._id,
          finance_firstName: finance.finance_firstName,
          finance_lastName: finance.finance_lastName,
          finance_email: finance.finance_email
        });
      } else {
        return res.status(404).send({
          message: "Wrong Password"
        });
      }
    }
  });
});

router.get("/:financeID", (req, res, next) => {
  const id = req.params.financeID;
  Finance.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "Nothing found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:financeID", (req, res, next) => {
  const id = req.params.financeID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Finance.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:financeID", (req, res, next) => {
  const id = req.params.financeID;
  Finance.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
