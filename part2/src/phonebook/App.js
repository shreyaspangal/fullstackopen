import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';
import contactService from './services/contacts';
import "../index.css";

const Notification = ({ notification: { type, message } }) => {
    if (message === null) {
        return null
    }

    if (type === 'error') {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    if (type === 'success') {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

const initialNotification = {
    type: null,
    message: null
};

const App = () => {
    let [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState("");
    const [notification, setNotification] = useState(initialNotification);

    const resetNotification = () => {
        return setTimeout(() => {
            setNotification(initialNotification);
        }, 5000);
    }

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
                    .then(data => {
                        setPersons(persons.map(person => person.id != duplicateContact.id ? person : data))
                        // Notification view
                        setNotification({ type: 'success', message: `Replaced ${data.name} with ${data.number}!` });
                        resetNotification();
                    })
                    .catch(error => {
                        // Notification view - when deleted contact is updated
                        setNotification({ type: 'error', message: `Contact of ${changedContact.name} has already been removed from the server!` });
                        resetNotification();
                    });
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
                // Notification view
                setNotification({ type: 'success', message: `Added ${newData.name}` });
                resetNotification();
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
                    // Notification view
                    setNotification({ type: 'error', message: `Deleted ${object.name} successfully!` });
                    resetNotification();
                })
                .catch(error => {
                    console.warn(error.response.data);
                    alert(`Error: ${error.message}`)
                });
        }
        return;
    }

    const PersonFormData = { newName, setNewName, newNumber, setNewNumber, handleSubmit };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add new contact</h3>
            <PersonForm PersonFormData={PersonFormData} />
            <h3>Numbers</h3>
            <Persons contacsToShow={contacsToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App
