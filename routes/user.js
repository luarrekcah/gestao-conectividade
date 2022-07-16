const express = require("express"),
  router = express.Router();

const allData = require("../data");

router.get("/", (req, res, next) => {
  const data = {
    og: {
      title: "Página Principal",
      banner: "",
    },
    jobs: allData.jobs,
    allData,
    user: req.user,
  };

  console.log(req.user)

  res.render("dashboard", data);
});

module.exports = router;