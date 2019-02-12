const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const nodemailer = require("nodemailer");

// Pour LOGIN
const ensureLogin = require("connect-ensure-login");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// SignUp
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", {
      message: "Indicate username and password"
    });
    return;
  }
  const role = req.body.role;
  const color = req.body.color

  // create new user 
  User.findOne({
    email
  }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The email already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      role,
      color
    });

    newUser.save()
    .then((user) => {
      // res.redirect("/");
      res.redirect("/tribe")
    })
    .catch((err) => {
      next(err);
    })
  })
});
  
    

//     newUser.save()
//       .then(() => {
//         // user is now persisted into DB, let's send him a welcome email
//         // let {
//         //   email,
//         //   subject,
//         //   message
//         // } = req.body;
//         // let transporter = nodemailer.createTransport({
//         //   service: 'hotmail',
//         //   auth: {
//         //     user: 'justar2019@outlook.fr',
//         //     pass: 'ironhack75'
//         //   }
//         // });
//         // console.log(1)
//         // transporter.sendMail({
//         //     from: '"Justar 👻" <justar2019@outlook.fr>',
//         //     to: email,
//         //     subject: "Welcome to My Tribe",
//         //     text: "welcome",
//         //     html: `Welcome to My Tribe, you have successfully created your account! <br> </br>
//         //     You can login there: 
//         //       <b>http://localhost:3000/login</b>`
//         //   })
//         //   .then(message => {
//         //     console.log('ok email')
//         //     res.render('tribe', {
//         //       email
//         //     })
//         //   })
//         //   .catch(error => {
//         //     console.log(error);
//         //     res.send('Nok email')
//         //   });
//       })
//       .catch(err => {
//         console.log(err)
//         res.render("tribe", {
//           message: "Something went wrong"
//         });
//       })
//   });
// });

// router.post('/message', (req, res, next) => {
//   let {
//     email,
//     subject,
//     message
//   } = req.body;
//   let transporter = nodemailer.createTransport({
//     service: 'outlook',
//     auth: {
//       user: 'justar2019',
//       pass: 'ironhack75'
//     }
//   });
//   transporter.sendMail({
//       from: '"Justar 👻" <justar2019@outlook.fr>',
//       to: email,
//       subject: "Welcome to My Tribe",
//       text: "Welcome to My Tribe",
//       html: `<b>${message}</b>`
//     })
//     .then(message => res.render('auth/message', {
//       email,
//       subject,
//       message
//     }))
//     .catch(error => console.log(error));
// });



// ROUTE LOGIN 
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/task",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/task", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("task/index", { user: req.user });
});



router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;