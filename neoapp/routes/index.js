var express = require('express');
var router = express.Router();
const userModel = require("./users")
const passport = require('passport')
const localStrategy = require("passport-local")

passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});
router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});
//created flash
// router.get('/failed', function (req, res) {
//   req.flash("age", 31)
//   req.flash("name", "karan")
//   res.send("bangya")
// });
//check & use flash
// router.get('/checkkaro', function (req, res) {
//   console.log(req.flash("age"), req.flash("name"))
//   res.send("check kro backend terminal pe")
// });

// router.get("/create", async function (req, res) {
//   let userdata = await userModel.create({
//     username: "kamal",
//     nickname: "science",
//     description: "i am father like everything in javascript",
//     categories: ["books", "poetry", "shirt"],
//   })
//   res.send(userdata)
// })
//casesensitive seach
// router.get("/find", async function (req, res) {
//   const regex = new RegExp("^KAMAL$", "i")
//   let user = await userModel.find({
//     username: regex
//   })
//   res.send(user)
// })
//finding all on a categoriess based
// router.get("/find", async function (req, res) {
//   let user = await userModel.find({ categories: { $all: ["books"] } })
//   res.send(user)
// })

//finding all on a date based
// router.get("/find", async function (req, res) {
//   var date1 = new Date('2024-01-01')
//   var date2 = new Date('2024-03-04')
//   let user = await userModel.find({ datecreated: { $gte: date1, $lte: date2 } })
//   res.send(user)
// })

// exists
// router.get("/find", async function (req, res) {
//   var date1 = new Date('2024-01-01')
//   var date2 = new Date('2024-03-04')
//   let user = await userModel.find({ categories: { $exists: true } })
//   res.send(user)
// })

//min and max length
// router.get("/find", async function (req, res) {

//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP: "nickname" }, 0] },
//         { $lte: [{ $strLenCP: "nickname" }, 12] }
//       ]
//     }
//   })
//   res.send(user)
// })

router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  })

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile')
      })
    })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res) {

})

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err)
    res.redirect("/")
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/")

}
module.exports = router;
