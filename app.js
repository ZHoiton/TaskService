const express = require("express");
const body_parser = require("body-parser");

const middleware = require("./app/middleware/middleware");
const controllers = require("./app/controllers/controllers");

console.log(middleware, controllers);
const app = express();

const port = 4000;

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/task", middleware.taskMiddleware.verify, (request, response) => {
    response.sendStatus(200);
});

app.listen(port, () => console.log(`app started on port ${port}!`));
