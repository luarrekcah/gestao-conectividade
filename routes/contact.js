const express = require("express"),
  router = express.Router();

const allData = require("../data");

router.get("/", (req, res, next) => {
  const data = {
    og: {
      title: "Contato",
      banner: "",
    },
    allData,
    user: req.user,
  };

  res.render("contact", data);
});

module.exports = router;
