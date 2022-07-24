const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

export default Total;
