// import express from 'express';
// import bodyParser from 'body-parser';
// import userRoutes from './routes/users.js'

const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const PORT = 5000

// app.use(bodyParser.json());
// app.use('/users', userRoutes);


// Connect to a database (in this example, a new file-based database)
const db = new sqlite3.Database('database.db');

// Define the SQL statement to create a table
const createTableSql = `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY UNIQUE AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NULL,
        calories INTEGER NOT NULL,
        date_created DATE NOT NULL
    )`;

// Execute the SQL statement to create the table
db.run(createTableSql, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table created successfully');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connection closed');
});

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

//creat
app.get("/create", (req, res) => {
    res.render("create", { model: {} });
});

app.post("/create", (req, res) => {
    const sql = "INSERT INTO items (Name, Description, Calories) VALUES (?, ?, ?)";
    const book = [req.body.Name, req.body.Description, req.body.Calories];
    db.run(sql, book, err => {
        // if (err) ...
        res.redirect("/books");
    });
});


//read
app.get("/items", (req, res) => {
    const sql = "SELECT * FROM items"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("items", { model: rows });
    });
  });

//updat
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM items WHERE id = ?";
    db.get(sql, id, (err, row) => {
      // if (err) ...
      res.render("edit", { model: row });
    });
  });

  app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const item = [req.body.Name, req.body.Description, req.body.Calories, id];
    const sql = "UPDATE items SET name = ?, description = ?, calories = ?, WHERE (item_ID = ?)";
    db.run(sql, item, err => {
      // if (err) ...
      res.redirect("/items");
    });
  });

//deelet
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM items WHERE id = ?";
    db.run(sql, id, err => {
      // if (err) ...
      res.redirect("/items");
    });
  });


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
