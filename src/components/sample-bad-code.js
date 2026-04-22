// Sample intentionally vulnerable and poorly written code

const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

// ❌ Hardcoded credentials (Security Issue)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123", // Sensitive info exposed
  database: "test_db",
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed"); // ❌ Poor logging (no details)
  } else {
    console.log("Connected to DB");
  }
});

// ❌ Global variable (bad practice, memory risk)
let globalCache = [];

// ❌ API vulnerable to SQL Injection
app.get("/user", (req, res) => {
  const userId = req.query.id;

  // ❌ Direct string concatenation (SQL Injection)
  const query = "SELECT * FROM users WHERE id = " + userId;

  db.query(query, (err, results) => {
    if (err) {
      res.send("Error occurred"); // ❌ No proper error handling
    } else {
      res.send(results);
    }
  });
});

// ❌ API vulnerable to XSS
app.post("/comment", (req, res) => {
  const comment = req.body.comment;

  // ❌ No sanitization
  res.send(`<html><body>${comment}</body></html>`);
});

// ❌ Memory leak / unbounded growth
app.get("/cache", (req, res) => {
  const data = new Array(1000000).fill("some large data"); // heavy allocation

  globalCache.push(data); // ❌ keeps growing, no cleanup

  res.send("Cached data");
});

// ❌ Inefficient DB query (full table scan)
app.get("/all-users", (req, res) => {
  const query = "SELECT * FROM users"; // ❌ no pagination

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results); // ❌ could be huge response
    }
  });
});

// ❌ Blocking operation (CPU hotspot)
app.get("/compute", (req, res) => {
  let result = 0;

  // ❌ CPU intensive loop blocking event loop
  for (let i = 0; i < 1e9; i++) {
    result += i;
  }

  res.send("Computation done: " + result);
});

// ❌ No input validation
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ❌ Plain text password comparison
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  db.query(query, (err, results) => {
    if (results.length > 0) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  });
});

// ❌ Unhandled promise (if async used later)
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data");
    }, 1000);
  });
}

fetchData(); // ❌ ignored result

// ❌ Magic numbers, no constants
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
