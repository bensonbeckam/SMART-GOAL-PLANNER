import { useEffect, useState } from "react";
import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from "./api/goals";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import Overview from "./components/Overview";

export default function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals on mount
  useEffect(() => {
    getGoals().then(setGoals);
  }, []);

  // Add new goal
  async function handleAdd(goal) {
    const newGoal = await addGoal(goal);
    setGoals((prev) => [...prev, newGoal]);
  }

  // Update goal (edit)
  async function handleUpdate(id, updates) {
    const updated = await updateGoal(id, updates);
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  }

  // Delete goal
  async function handleDelete(id) {
    await deleteGoal(id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  // Deposit to goal
  async function handleDeposit(id, amount) {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const updated = await updateGoal(id, {
      savedAmount: goal.savedAmount + amount,
    });
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  }

  return (
    <div className="app-container" >
      <h1>Smart Goal Planner</h1>
      <GoalForm onAdd={handleAdd} />
      <Overview goals={goals} />
      <GoalList
        goals={goals}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onDeposit={handleDeposit}
      />
    </div>
  );
}