import React from 'react';
import ReactDOM from 'react-dom/client';
import PhonebookApp from './phonebook/App';
import CourseinfoApp from './courseinfo/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PhonebookApp />
    {/* <CourseinfoApp /> */}
  </React.StrictMode>
);
