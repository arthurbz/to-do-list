const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5002, () => {
    console.log("server started on port 5002");
});

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description])
        console.log(req.body);

        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT id, description FROM todo"
        )
        console.log(allTodos.rows)
        res.json(allTodos.rows)

    } catch (error) {
        console.log(error.message)
    }
})