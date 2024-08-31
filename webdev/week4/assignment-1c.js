//? Create a TODOs CLI to manage tasks in JSON file

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program.name("counter").description("CLI to do file based tasks").version("0.8.0");

program.command("add")
  .description("Add a TODO")
  .argument("<task>", "task to do")
  .action((task) => {
    fs.readFile('./todos.json', "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let todos
            if (data === "") {
                todos = [];
            } else {
                todos = JSON.parse(data);
            }
            todos.push({ task: task, done: false });
            fs.writeFile('./todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Task added");
            }
            });
        }
    });
  });

program.command("delete")
    .description("Delete a TODO")
    .argument("<task>", "task to delete")
    .action((task) => {
        fs.readFile('./todos.json', "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let todos = JSON.parse(data) || [];
                let newTodos = todos.filter((todo) => todo.task !== task);
                fs.writeFile('./todos.json', JSON.stringify(newTodos), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Task deleted");
                }
                });
            }
        });
    });

program.command("complete")
    .description("Mark a TODO as complete")
    .argument("<task>", "task to mark as complete")
    .action((task) => {
        fs.readFile('./todos.json', "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let todos = JSON.parse(data) || [];
                let newTodos = todos.map((todo) => {
                    if (todo.task === task) {
                        todo.done = true;
                    }
                    return todo;
                });
                fs.writeFile('./todos.json', JSON.stringify(newTodos), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Task marked as complete");
                }
                });
            }
        });
    });


program.parse();
