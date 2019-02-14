const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Tribe   = require('../models/Tribe');
const Task   = require('../models/Task');
const ensureLogin = require('connect-ensure-login');

router.get('/task', ensureLogin.ensureLoggedIn(), (req, res, next) => {


  if(!req.user){
    res.redirect("/login");
    return;
  }
  Task.find({ createdBy: req.user._id })
    .populate("assignedTo")
    .then((myCreatedTasks) => {
      res.locals.ArrayOfCreatedTasks = myCreatedTasks;
      //console.log(ArrayOfCreatedTasks);
      res.render("task/index");
    })
    .catch((err) => {
      next(err)
    })
    // .then(task => {
    //   res.render("task/index", { task });
    // })
    // .catch(error => {
    //   res.render("index");
    // })
})

router.get('/task/new', (req, res, next) => {
  Tribe.findOne({
    members:{$in: [req.user._id]}
  }).populate("members")
  .then(tribe => {
    if (!tribe) {
      res.redirect('/tribe')
    }
    console.log(tribe);
    res.render("task/new", {
      tribe
    })
  })
})

router.post('/task/new', (req, res, next) => {
  const { task, description, assignedTo, createdBy, date, status} = req.body;  
  const newTask = new Task({
    task: task,
    description: description,
    assignedTo: assignedTo,
    createdBy : req.user._id,
    date : date,
    status : status
  })
  newTask.save()
  .then(task => {
    res.redirect('/task')
  })
  .catch((error) => {
    console.log(error)
  })
});


// router.post('/task/:id/delete', (req, res, next) => {
//   let taskId = req.params.id;
//   Task.findByIdAndRemove({'_id': taskId})
//   .then(task => {
//     res.redirect('/task')
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// });

// router.get('/task/:id/edit', (req, res, next) => {
//   let taskId = req.params.id;
//   task.findOne({'_id': taskId})
//     .then(task => {
//       res.render("task/edit", { task })
//     })
//     .catch(error => {
//       console.log(error)
//     })
// });

// router.post('/task/:id/edit', (req, res, next) => {
//    let taskId = req.params.id;
//    const { name, occupation, catchPhrase } = req.body;
//   task.update({'_id': taskId},{ $set: { name, occupation, catchPhrase } })
//     .then(task => {
//       res.redirect('/task')
//     })
//      .catch(error => {
//        console.log(error)
//      })
//  });

 module.exports = router;