import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';
import contactService from './services/contacts';

const App = () => {
    let [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState("");

    const baseURL = "http://localhost:3001/persons";

    useEffect(() => {
        contactService
            .getAll()
            .then(data => setPersons(data));;
    }, []);

    //Common variable for holding person data to display
    const contacsToShow = !filter ? persons : persons.filter(person => {
        return Object.values(person).join('').toLowerCase().includes(filter.toLowerCase());
    });

    // Helper function for handling common onchange events
    // const handleOnChange = () => (event, setFunc) => {
    //     setFunc(event.target.value)
    // }
    // Custom onChange handler
    // const onChange = handleOnChange();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check for duplicate contacts
        const handleDuplicateContact = persons.find(person => person.name === newName);
        if (handleDuplicateContact) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        // If new contact, then update the contacts list
        const newContact = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        contactService.create(newContact)
            .then(newData => {
                setPersons(persons.concat(newData))
                setNewName('');
                setNewNumber('');
            })
            .catch(error => {
                return error.toString();
            });
    }

    const PersonFormData = { newName, setNewName, newNumber, setNewNumber, handleSubmit };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add new contact</h3>
            <PersonForm PersonFormData={PersonFormData} />
            <h2>Numbers</h2>
            <Persons contacsToShow={contacsToShow} />
        </div>
    )
}

export default App
