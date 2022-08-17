import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';
import contactService from './services/contacts';

const App = () => {
    let [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState("");

    useEffect(() => {
        contactService
            .getAllContacts()
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
        const duplicateContact = persons.find(person => person.name === newName);
        if (duplicateContact) {
            const confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            const changedContact = { ...duplicateContact, number: newNumber };

            if (confirmReplace) {
                contactService
                    .replaceContact(duplicateContact.id, changedContact)
                    .then(data => setPersons(persons.map(person => person.id != duplicateContact.id ? person : data)))
            }
            return;
        }
        // If new contact, then update the contacts list
        const newContact = {
            name: newName,
            number: newNumber,
        }
        contactService.createContact(newContact)
            .then(newData => {
                setPersons(persons.concat(newData))
                setNewName('');
                setNewNumber('');
            })
            .catch(error => {
                console.warn(error.response.data);
                alert(`Error: ${error.message}`)
            });
    }

    const handleDelete = (object) => {
        const confirmDelete = window.confirm(`Delete ${object.name}?`)

        if (confirmDelete) {
            contactService
                .deleteContact(object.id)
                .then(data => {
                    setPersons(persons.filter(person => person.id != object.id))
                })
        }
        return;
    }

    const handleReplace = () => {

    }

    const PersonFormData = { newName, setNewName, newNumber, setNewNumber, handleSubmit };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add new contact</h3>
            <PersonForm PersonFormData={PersonFormData} />
            <h2>Numbers</h2>
            <Persons contacsToShow={contacsToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App
