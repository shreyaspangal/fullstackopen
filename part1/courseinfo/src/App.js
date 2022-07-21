import { useState, useEffect } from "react";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = () => (item, setItem) => {
    setItem(item + 1);
  };

  const onClick = handleClick();

  const total = good + neutral + bad;
  const goodValue = good;

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: (total / 3).toFixed(1),
    positivesPercentage: ((goodValue / 100) * total).toFixed(1) + " %",
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => onClick(good, setGood)}>good</button>
      <button onClick={() => onClick(neutral, setNeutral)}>neutral</button>
      <button onClick={() => onClick(bad, setBad)}>bad</button>
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
