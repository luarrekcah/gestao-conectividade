const express = require("express"),
  router = express.Router();

const allData = require("../data");

router.get("/", (req, res, next) => {
  const data = {
    og: {
      title: "Blog",
      banner: "",
    },
  };
  res.render("blog", data);
});

router.get("/post", (req, res, next) => {
  const data = {
    og: {
      title: "Blog",
      banner: "",
    },
    allData,
    user: req.user,
  };
  res.render("blogPost", data);
});

module.exports = router;
