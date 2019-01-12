const express = require("express");
const body_parser = require("body-parser");
const { Connection } = require("./db/connection");
Connection.connect();

const middleware = require("./app/middleware/middleware");
const { TaskController } = require("./app/controllers/controllers");

const app = express();

const port = 4000;

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/task", middleware.taskMiddleware.create, TaskController.create);

app.post("/u", TaskController.addUser);

app.post("/a", TaskController.add);

app.listen(port, () => console.log(`app started on port ${port}!`));
