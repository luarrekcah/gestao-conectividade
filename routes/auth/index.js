const express = require("express"),
  router = express.Router();

const allData = require("../../data");

const passportGoogle = require("../../auth/google")

router.get("/", (req, res, next) => {
  res.send("Acho que você digitou o link errado amigo.");
});

router.get("/login", (req, res, next) => {
  const data = {
    og: {
      title: "Login - RR",
      banner: "",
      url: allData.default.url,
    },
    user: req.user,
  };

  res.render("login", data);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/default", (req, res) => {});

router.get(
  "/google",
  passportGoogle.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/google/callback",
  passportGoogle.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
