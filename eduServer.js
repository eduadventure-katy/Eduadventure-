// eduServer.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- USERS DATABASE ---
let users = [
  { email: "test@example.com", password: "123456", role: "user" },
  { email: "creator@eduadventure.com", password: "kate2025", role: "creator" } // 👑 Creator account
];

// --- LOGIN ROUTE ---
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    if (user.role === "creator") {
      res.json({ message: "Welcome back, Creator Kate!", role: "creator" });
    } else {
      res.json({ message: "Login successful!", role: "user" });
    }
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
});

// --- REGISTER ROUTE ---
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered." });
  }
  users.push({ email, password, role: "user" });
  res.json({ message: "Registration successful! You can now log in." });
});

// --- FORGOT PASSWORD ROUTE ---
app.post("/forgot", (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ message: "Password reset link sent to your email (demo)." });
  } else {
    res.status(404).json({ message: "Email not found." });
  }
});

app.listen(PORT, () =>
  console.log(`✅ EduAdventure server running on http://localhost:${PORT}`)
);