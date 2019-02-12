const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Tribe   = require('../models/Tribe');

// GET tribe page 
router.get('/tribe', (req, res, next) => {
  if(!req.user) {

    //redirect away if you arent logged in
    // req.flash("error", "you must logged in.")
    res.redirect("/login");
    return;
  }
  res.render('tribe');
});

 
router.post('/createTribe', (req, res, next) => { 
  if(!req.user) {

    //redirect away if you arent logged in
    // req.flash("error", "you must logged in.")
    res.redirect("/login");
    return;
  }
  const { name } = req.body;
  const { membername } = req.body; //tableau de noms 
  const { thisUser } = req.user
  //TODO: lier la famille au User 

  //TODO: parcourir membername et créer new users. 1.créer autant de users qu'il y a de membername 2.grâce à tous les users dont on a récupéré l'ID créer
  // une nouvelle tribe avec tous les users. 
  let promises = [];

//   membername.forEach(function(name) {
//     promises.push(new User({
//       username: name,
//       password: "changeme"
//     }).save());
//   });

//   Promise.all(promises).then(function(users){
//     console.log(users);
//     users.push(req.users._id)
//     const newTribe = new Tribe({
//       name: name,
//       members: users
//     }).save()
//       .catch((error) => {
//         console.log(error);
//         next(error);
//       })
//       .then(function (tribe) {
//         res.redirect('/task');
//       });
//   });
// });

  membername.forEach(function(name) {
    promises.push(new User({
      username: name,
      password: "changeme"
    }).save());
  });

  Promise.all(promises).catch(function (err) {
    console.error(err);
    next(err);
  }).then(function(users){
    console.log(users);
    users.push()

    const newTribe = new Tribe({
      name: name,
      members: users
    }).save()
      .catch((error) => {
        console.log(error);
        next(error);
      })
      .then(function (tribe) {
        // res.send('save tribe ok')
        //res.redirect('/tribe');
        res.render("dashboard.hbs")
      });
  });
});

module.exports = router;
