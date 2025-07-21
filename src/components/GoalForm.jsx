import { useState } from "react";

export default function GoalForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.targetAmount || !form.deadline) return;
    onAdd({
      ...form,
      targetAmount: Number(form.targetAmount),
      savedAmount: 0,
    });
    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        name="name"
        placeholder="Goal Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="targetAmount"
        type="number"
        placeholder="Target Amount"
        value={form.targetAmount}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}