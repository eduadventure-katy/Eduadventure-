// backend/server.js
import express from "express";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// === File paths ===
const USERS_FILE = "./users.json";
const CHATS_FILE = "./chats.json";

// === Ensure files exist ===
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(CHATS_FILE)) fs.writeFileSync(CHATS_FILE, "[]");

// === Helper functions ===
function readData(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// === Register User ===
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const users = readData(USERS_FILE);

  if (users.find((u) => u.email === email)) {
    return res.json({ message: "❌ Email already registered!" });
  }

  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);
  writeData(USERS_FILE, users);

  res.json({ message: "✅ Registration successful!", user: newUser });
});

// === Login User ===
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readData(USERS_FILE);

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.json({ message: "❌ Incorrect email or password!" });
  }

  res.json({ message: "✅ Login successful!", user });
});

// === Get Profile ===
app.get("/profile/:email", (req, res) => {
  const { email } = req.params;
  const users = readData(USERS_FILE);
  const user = users.find((u) => u.email === email);
  if (!user) return res.json({ message: "User not found!" });
  res.json(user);
});

// === Simple AI Chat (Offline) ===
app.post("/chat", (req, res) => {
  const { message, email } = req.body;
  const chats = readData(CHATS_FILE);

  const reply = getAIReply(message);
  chats.push({ user: email || "guest", message, reply, time: new Date() });
  writeData(CHATS_FILE, chats);

  res.json({ reply });
});

// === Simple AI logic (offline) ===
function getAIReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello")) return "Hello there! 👋 I'm your EduAdventure AI assistant.";
  if (msg.includes("html")) return "HTML builds the structure of your web pages 🌐.";
  if (msg.includes("css")) return "CSS adds color and beauty to your website 🎨.";
  if (msg.includes("javascript") || msg.includes("js")) return "JavaScript brings life and interactivity ⚡.";
  if (msg.includes("python")) return "Python is great for data and AI projects 🧠.";
  if (msg.includes("java")) return "Java powers many Android apps ☕.";
  if (msg.includes("c++")) return "C++ is perfect for games and fast programs 🎮.";
  return "I'm EduAI 🤖 — ask me anything about coding or tech!";
}

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ EduAdventure Backend running at http://localhost:${PORT}`);
});