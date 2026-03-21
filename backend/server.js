import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Transaction from "./models/Transaction.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/financeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
