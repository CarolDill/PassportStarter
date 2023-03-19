const express = require("express");
const router = express.Router();
// const session = require('express-session');
const { ensureAuthenticated, adminAuthenticated } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", adminAuthenticated, (req, res) => {
  req.sessionStore.all((error, sessions) => {
    // console.log(sessions[Object.keys(sessions)].passport.user) - only works when there is just one active session
    const sessionsInfo = Object.keys(sessions);
    res.render("admin", {
      user: req.user,
      sessions: sessions,
      sessionsInfo: sessionsInfo
    });
  })
});

router.get('/delete/:sessionID', adminAuthenticated, (req, res) => {
  const sessionID = req.params.sessionID;
  req.sessionStore.all((error, sessions) => {
    if (sessionID == req.session.id) {
      console.log(sessionID);
      req.sessionStore.destroy(sessionID, (error) => {
        res.redirect('/auth/login')
      })
    } else {
      req.sessionStore.destroy(sessionID, (error) => {
        console.log(sessionID);
        res.redirect('/admin');
      })
    }
  })
})


module.exports = router;
