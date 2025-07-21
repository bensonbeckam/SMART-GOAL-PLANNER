import { useState } from "react";

export default function DepositForm({ goalId, onDeposit }) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount) return;
    onDeposit(goalId, Number(amount));
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <input
        type="number"
        min="1"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}