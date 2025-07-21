function daysLeft(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="overview-box">
      <h2>Overview</h2>
      <p>
        <b>Total goals:</b> {totalGoals} <br />
        <b>Total saved:</b> ${totalSaved} <br />
        <b>Goals completed:</b> {completed}
      </p>
      <ul>
        {goals.map((g) => {
          const left = daysLeft(g.deadline);
          const isComplete = g.savedAmount >= g.targetAmount;
          let status = "";
          if (!isComplete) {
            if (left < 0) status = <span className="overdue"> (Overdue)</span>;
            else if (left <= 30) status = <span className="warning"> (⚠️ Less than 30 days left)</span>;
          }
          return (
            <li key={g.id}>
              <b>{g.name}</b>: {isComplete ? "Completed" : `${left} days left`}
              {status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}