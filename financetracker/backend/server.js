import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
import Transaction from "./models/Transaction.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const mongoURL = "mongodb://localhost:27017";
const client = new MongoClient(mongoURL);
const dbName = "financeDB";

async function initDB() {
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection("users");

  // Add default admin user if not present
  const existing = await users.findOne({ username: "admin" });
  if (!existing) {
    await users.insertOne({ username: "admin", password: "1234" });
    console.log("✅ Default user created: admin / 1234");
  }
  console.log("✅ Connected to MongoDB (native driver)");
}
initDB().catch(console.error);

// ====== EXISTING TRANSACTION ROUTES ======
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
  const { type, amount, description } = req.body;
  const transaction = new Transaction({ type, amount, description });
  await transaction.save();
  res.json(transaction);
});

app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
});

// ====== NEW ROUTES ======
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", async (req, res) => {
  try {
    const db = client.db(dbName);
    const { username, password } = req.body;
    const user = await db.collection("users").findOne({ username, password });
    if (user) res.json({ success: true });
    else res.json({ success: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ====== SERVER START ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
