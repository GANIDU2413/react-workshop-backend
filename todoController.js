const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let todos = [];

fs.readFile("todos.txt", "utf8", (err, data) => {
  if (err) console.error("Failed to read from txt file", err);
  else todos = JSON.parse(data);
});

exports.getTodos = (req, res) => res.json(todos);

exports.createTodo = (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuidv4();

  todos.push(newTodo);

  updateTxtFile(todos)
    .then(() => res.json(newTodo))
    .catch((err) =>
      res.status(500).json({ message: "Failed to save the todo", error: err })
    );
};

exports.updateTodo = (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;

  todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));

  updateTxtFile(todos)
    .then(() => res.json(updatedTodo))
    .catch((err) =>
      res.status(500).json({ message: "Failed to update the todo", error: err })
    );
};

exports.deleteTodo = (req, res) => {
  const id = req.params.id;

  todos = todos.filter((todo) => todo.id !== id);

  updateTxtFile(todos)
    .then(() => res.json({ message: `Todo ${id} deleted.` }))
    .catch((err) =>
      res.status(500).json({ message: "Failed to delete the todo", error: err })
    );
};

function updateTxtFile(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile("todos.txt", JSON.stringify(todos), (err) => {
      if (err) {
        console.error("Failed to write to txt file", err);
        reject(err);
      } else {
        console.log("The txt file was updated successfully");
        resolve();
      }
    });
  });
}
