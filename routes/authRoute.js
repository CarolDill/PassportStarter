const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
  });
  res.redirect('/auth/login');
});

router.get('/github',
  passport.authenticate('github', { successRedirect: "/dashboard"}));

router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/login', 
    successRedirect: "/dashboard"
  }),
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // }
  );

module.exports = router;
