const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  Order.find()
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

//To place a new order
router.post("/", (req, res, next) => {
  let order = new Order();

  order.employee_id = req.body.employee_id;
  order.order_for = req.body.order_for;
  order.order_price = req.body.order_price;

  //This saves the order in the database
  order
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

//Find all the orders by a particular employee
router.get("/employee/:employeeID", (req, res, next) => {
  const id = req.params.employeeID;

  Order.find({ employee_id: id })
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

//Find Orders not reviewed yet by either admin or finance
router.get("/reviewed/:adminOrFinance", (req, res, next) => {
  const adminOrFinance = req.params.adminOrFinance;

  adminOrFinance === "finance"
    ? Order.find({ finance_viewed_by: { $exists: false } })
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
        })
    : adminOrFinance === "admin"
    ? Order.find({ admin_viewed_by: { $exists: false } })
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
        })
    : res.status(404).json({
        message: "Search parameters not specified."
      });
});

router.get("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.findById(id)
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

router.patch("/:orderID", (req, res, next) => {
  const id = req.params.orderID;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Order.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.deleteOne({ _id: id })
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
