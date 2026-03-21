import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", transactionSchema);
