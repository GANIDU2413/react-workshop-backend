const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./todoController");

app.get("/todos", getTodos);

app.post("/todos", createTodo);

app.put("/todos/:id", updateTodo);

app.delete("/todos/:id", deleteTodo);

app.listen(port, () =>
  console.log(`Todo app listening at http://localhost:${port}`)
);
