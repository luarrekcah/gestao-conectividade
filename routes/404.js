const express = require("express"),
  router = express.Router();

const allData = require("../data");

router.get("/", (req, res, next) => {
  const data = {
    og: {
      title: "Página não encontrada",
      banner: "",
    },
    jobs: allData.jobs,
    allData,
    user: req.user,
  };

  res.render("404", data);
});

module.exports = router;
