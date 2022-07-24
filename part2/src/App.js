import React from 'react';
import Course from './components/Course';

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'Using props to pass data',
        exercises: 9,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App;
