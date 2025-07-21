import { useState } from "react";
import ProgressBar from "./ProgressBar";
import DepositForm from "./DepositForm";

export default function GoalItem({ goal, onUpdate, onDelete, onDeposit }) {
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    onUpdate(goal.id, {
      ...editForm,
      targetAmount: Number(editForm.targetAmount),
    });
    setEditing(false);
  }

  return (
    <div className="goal-card" >
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            required
          />
          <input
            name="targetAmount"
            type="number"
            value={editForm.targetAmount}
            onChange={handleEditChange}
            required
          />
          <input
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
          />
          <input
            name="deadline"
            type="date"
            value={editForm.deadline}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>
            <b>Category:</b> {goal.category || "-"}<br />
            <b>Target:</b> ${goal.targetAmount}<br />
            <b>Saved:</b> ${goal.savedAmount}<br />
            <b>Deadline:</b> {goal.deadline}
          </p>
          <ProgressBar value={goal.savedAmount} max={goal.targetAmount} />
          <p>
            <b>Remaining:</b> ${Math.max(0, goal.targetAmount - goal.savedAmount)}
          </p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(goal.id)}>Delete</button>
          <DepositForm goalId={goal.id} onDeposit={onDeposit} />
        </>
      )}
    </div>
  );
}