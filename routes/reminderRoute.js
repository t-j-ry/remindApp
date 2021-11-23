const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
// const Database = require('../models/database');

router.get("/allReminders", ensureAuthenticated, (req, res) => {
  console.log(req.user.reminders)
  res.render("allReminders", {
    reminders: req.user.reminders
    // user: req.user,
  });
});
router.get("/createReminders", ensureAuthenticated, (req, res) => {
  res.render("createReminders", {
    // reminders: Database.cindy.reminders
    // user: req.user,
  });
});

router.post("/allReminders", function (req, res) {
  console.log("before post request")
  let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false
  }
  req.user.reminders.push(reminder)
  res.render("allReminders", {
    reminders: req.user.reminders
  })
})

router.get("/:id/edit", ensureAuthenticated, (req, res) => {
  
  let reminderId = req.params.id
  let results = req.user.reminders.find(item => item.id == reminderId)

  if (results != undefined) {
      res.render("editReminders", {reminderItem: results})
  } else {
      res.redirect("/reminder")
  }

});

router.post("/update/:id", ensureAuthenticated, (req, res) => {
  
  let reminderId = (req.params.id-1)

  let reminder = req.user.reminders

  reminder[reminderId].title = req.body.title
  
  reminder[reminderId].description = req.body.description

  reminder[reminderId].completed = req.body.compeleted

  res.render("allReminders", {
    reminders: req.user.reminders
  })

});
router.post("/delete/:id", ensureAuthenticated, (req, res) => {
  
  req.user.reminders.forEach((reminder, index, arr) => {       
    if (reminder.id == req.params.id) {
        arr.splice(index, 1)
    }
})

  res.render("allReminders", {
    reminders: req.user.reminders
  })

});

router.get("/singleReminders/:id", ensureAuthenticated, (req, res) => {
  
  let reminderId = req.params.id

  let results = req.user.reminders.find(item => item.id == reminderId)

  if (results != undefined) {
      res.render("singleReminders", {reminderItem: results})
  } else {
      res.redirect("allReminders")
  }

});

module.exports = router;
