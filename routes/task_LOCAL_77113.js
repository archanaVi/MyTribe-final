const express = require('express');
const router  = express.Router();
const task = require('../models/Task');

// Create Task
router.get('/task', (req, res, next) => {
  res.render('task');
});

// router.post('/task', (req, res, next) => {
//   const {task, description, assignedTo, date, status} = req.body; //obligatoire pour passer ensuite les valeurs à Book
//   const newTask = new Task ({task, description, assignedTo, date, status})
//   newTask.save()
//   .then((task) => {
//     res.redirect('/task');
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// });


module.exports = router;