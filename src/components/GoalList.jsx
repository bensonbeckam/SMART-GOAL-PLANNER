import GoalItem from "./GoalItem";

export default function GoalList({ goals, onUpdate, onDelete, onDeposit }) {
  if (!goals.length) return <p>No goals yet.</p>;
  return (
    <div>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}