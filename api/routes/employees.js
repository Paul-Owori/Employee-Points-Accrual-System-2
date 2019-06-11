const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Employee = require("../models/Employee");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  Employee.find()
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

//To signup a new employee
router.post("/signup", (req, res, next) => {
  let employee = new Employee();

  employee.employee_firstName = req.body.firstName;
  employee.employee_lastName = req.body.lastName;
  employee.employee_email = req.body.email;
  employee.employee_seniority = req.body.seniority;
  employee.employee_joinDate = req.body.joinDate;
  employee.setPassword(req.body.password);

  //This saves the employee in the database
  employee
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

//To login an employee
router.post("/signin", (req, res) => {
  // find employee with requested email
  //receives two parameters, email and password
  Employee.findOne({ employee_email: req.body.email }, function(err, employee) {
    if (employee === null) {
      return res.status(404).send({
        message: "User not found."
      });
    } else {
      if (employee.validPassword(req.body.password)) {
        return res.status(200).send({
          _id: employee._id,
          employee_firstName: employee.employee_firstName,
          employee_lastName: employee.employee_lastName,
          employee_seniority: employee.employee_seniority,
          employee_email: employee.employee_email,
          employee_joinDate: employee.employee_joinDate,
          employee_pointsSpent: employee.employee_pointsSpent
        });
      } else {
        return res.status(404).send({
          message: "Wrong Password"
        });
      }
    }
  });
});

router.get("/:employeeID", (req, res, next) => {
  const id = req.params.employeeID;
  Employee.findById(id)
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

router.get("/updated/:employeeID", (req, res, next) => {
  const id = req.params.employeeID;
  Employee.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).send({
          _id: doc._id,
          employee_firstName: doc.employee_firstName,
          employee_lastName: doc.employee_lastName,
          employee_seniority: doc.employee_seniority,
          employee_email: doc.employee_email,
          employee_joinDate: doc.employee_joinDate,
          employee_pointsSpent: doc.employee_pointsSpent
        });
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

router.patch("/:employeeID", (req, res, next) => {
  const id = req.params.employeeID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Employee.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:employeeID", (req, res, next) => {
  const id = req.params.employeeID;
  Employee.deleteOne({ _id: id })
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
