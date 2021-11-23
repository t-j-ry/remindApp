const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require('../controllers/reminder_controller');
const Database = require('../models/database');

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders", {
    reminders: Database.cindy.reminders
    // user: req.user,
  });
});

module.exports = router;
