const indexRouter = require("./routes/index"),
blogRouter = require("./routes/blog"),
jobListRouter = require("./routes/jobList"),
contactRouter = require("./routes/contact"),
loginRouter = require('./routes/auth'),
userRouter = require("./routes/user"),
notFoundRouter = require("./routes/404")

const authRouter = require("./routes/auth");

const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
};

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/blog", blogRouter);
  app.use("/jobs", jobListRouter);
  app.use("/contato", contactRouter);
  app.use("/auth", loginRouter);
  app.use("/dashboard", authenticationMiddleware, userRouter);
  app.use("*", notFoundRouter)
}