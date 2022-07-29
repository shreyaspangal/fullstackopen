import React from 'react';
import ReactDOM from 'react-dom/client';
import PhonebookApp from './phonebook/App';
import CourseinfoApp from './courseinfo/App';
import DataForCountriesApp from './dataforcountries/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <PhonebookApp /> */}
    {/* <CourseinfoApp /> */}
    <DataForCountriesApp />
  </React.StrictMode>
);
