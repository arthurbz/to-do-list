const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server started on port 5000");
});

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        console.log(req.body);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT id, description FROM todo"
        );
        console.log(allTodos.rows);
        res.json(allTodos.rows);

    } catch (error) {
        console.error(error.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT id, description FROM todo WHERE id = ($1)",
            [id]
        );
        res.json(todo.rows);

    } catch (error) {
        console.error(error.message);
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query(
            "UPDATE todo SET description = ($1) WHERE id = ($2)",
            [description, id]
        );
        res.json("The todo with ID " + id + " was updated!");

    } catch (error) {
        console.error(error.message);
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM todo where id = ($1)",
            [id]
        );
        res.json("Task was deleted!");

    } catch (error) {
        console.error(error.message);
    }
});