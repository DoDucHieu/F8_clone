const newsRouter = require("./news");
const homeRouter = require("./home");
const coursesRouter = require("./courses");
const meRouter = require("./me");

function route(app) {
    app.use("/news", newsRouter);
    app.use("/home", homeRouter);
    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
}

module.exports = route;
