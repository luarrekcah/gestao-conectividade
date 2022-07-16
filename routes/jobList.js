const express = require("express"),
  router = express.Router(),
  searchEngine = require('../libs/searchEngine');

const allData = require("../data");

const objetoVazio = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

router.get("/", (req, res) => {
  let jobs = [];
  if (objetoVazio(req.query)) {
    jobs = allData.jobs;
  } else {
    jobs = searchEngine(allData.jobs, req.query.pesquisa)
  }
  const data = {
    og: {
      title: "Lista de Jobs",
      banner: "",
    },
    jobs,
    allData,
    user: req.user,
  };
  res.render("jobList", data);
});

router.get("/:id/detalhes", (req, res) => {
  const job = allData.jobs.find((item) => item.id === req.params.id)
  const data = {
    og: {
      title: "Detalhes",
      banner: "",
    },
    job,
    allData,
    user: req.user,
  };
  res.render("jobDetails", data);
});

module.exports = router;
