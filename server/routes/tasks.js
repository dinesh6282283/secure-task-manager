const express = require("express");
const taskRouter = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller.js");

const auth = require("../middleware/auth");

//read
taskRouter.get("/", auth, getTasks);

//create
taskRouter.post("/", auth, createTask);

//update
taskRouter.put("/:id", auth, updateTask);

//delete
taskRouter.delete("/:id", auth, deleteTask);


module.exports = taskRouter;
