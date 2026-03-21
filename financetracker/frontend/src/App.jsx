import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/api/transactions");
    setTransactions(res.data);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/transactions", { type, amount, description });
    setAmount("");
    setDescription("");
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchTransactions();
  };

  const balance = transactions.reduce((acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount), 0);

  return (
    <div className="container">
      <h1>💰 Personal Finance Tracker</h1>
      <h2>Balance: ₹{balance}</h2>

      <form onSubmit={addTransaction} className="form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul className="transactions">
        {transactions.map((t) => (
          <li key={t._id} className={t.type}>
            <span>{t.description} - ₹{t.amount}</span>
            <button onClick={() => deleteTransaction(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
