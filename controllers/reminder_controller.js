let Database = require('../models/database')

let remindersController = {
    list: function (req, res) {
        return {reminders: Database.cindy.reminders}
    },
    new: function (req, res) {
        res.render("create.ejs", {})
    },
    create: function (req, res) {
        let reminder = {
            id: Database.cindy.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false
        }
        Database.cindy.reminders.push(reminder)
        res.redirect("/reminder")
    },
    listOne: function (req, res) {
        let reminderId = req.params.id
        let results = Database.cindy.reminders.find(item => item.id == reminderId)

        if (results != undefined) {
            res.render("/single-reminder", {reminderItem: results})
        } else {
            res.redirect("/reminder")
        }
    },
    edit: function (req, res) {
        let reminderId = req.params.id
        let results = Database.cindy.reminders.find(item => item.id == reminderId)

        if (results != undefined) {
            res.render("reminder/edit", {reminderItem: results})
        } else {
            res.redirect("/reminder")
        }
    },
    update: function (req, res) {
        let reminderId = (req.params.id-1)

        let reminder = Database.cindy.reminders

        reminder[reminderId].title = req.body.title
        
        reminder[reminderId].description = req.body.description

        reminder[reminderId].completed = req.body.completed

        res.redirect("/reminder")       
        
    },
    delete: function (req, res) {

        Database.cindy.reminders.forEach((reminder, index, arr) => {       
            if (reminder.id == req.params.id) {
                arr.splice(index, 1)
            }
        })

        res.redirect("/reminder")
    }
}

module.exports = remindersController