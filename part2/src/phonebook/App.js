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
            <p className='error text-4xl'>
                {message}
            </p>
        )
    }

    if (type === 'success') {
        return (
            <p className='success text-4xl'>
                {message}
            </p>
        )
    }
}

const initialNotification = {
    type: null,
    message: null
};

const App = () => {
    const [persons, setPersons] = useState([]);
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
            .then(data => setPersons(data));
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for duplicate contacts
        const getAllContacts = await contactService.getAllContacts();
        const duplicateContact = getAllContacts.find(contact => contact.name === newName);  // @Returns - Object || undefined;

        if (duplicateContact) {
            const confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            const updatedNumber = { number: newNumber };

            if (confirmReplace) {
                contactService
                    .replaceContact(duplicateContact.id, updatedNumber)
                    .then(data => {

                        if (data === null) {
                            // Notification view - when deleted contact is updated
                            setNotification({ type: 'error', message: `Contact of ${duplicateContact.name} has already been removed from the server!` });
                            resetNotification();
                        }

                        setPersons(persons.map(person => person.id !== duplicateContact.id ? person : data))
                        // Notification view
                        setNotification({ type: 'success', message: `Replaced ${data.name} with ${data.number}!` });
                        resetNotification();
                    })
                    .catch(error => {
                        console.warn(error.response);
                        // Notification view - when deleted contact is updated
                        setNotification({ type: 'error', message: error.response.data.error });
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
                setPersons(persons.concat(newData));
                console.log(persons);
                setNewName('');
                setNewNumber('');
                // Notification view
                setNotification({ type: 'success', message: `Added ${newName}` });
                resetNotification();
            })
            .catch(error => {
                console.warn(error.response);
                setNotification({ type: 'error', message: error.response.data.error });
                resetNotification();
            });
    }

    const handleDelete = (object) => {
        const confirmDelete = window.confirm(`Delete ${object.name}?`)

        if (confirmDelete) {
            contactService
                .deleteContact(object.id)
                .then(data => {
                    setPersons(persons.filter(person => person.id !== object.id))
                    // Notification view
                    setNotification({ type: 'error', message: `Deleted ${object.name} successfully!` });
                    resetNotification();
                })
                .catch(error => {
                    console.warn(error.response);
                    setNotification({ type: 'error', message: error.response.data.error });
                    resetNotification();
                });
        }
        return;
    }

    const PersonFormData = { newName, setNewName, newNumber, setNewNumber, handleSubmit };

    return (
        <div className='container mx-auto px-5 my-5 max-w-md'>
            <h2 className='my-5 font-bold text-3xl text-center'>Phonebook</h2>
            <Notification notification={notification} />
            <Filter filter={filter} setFilter={setFilter} />
            <h3 className='mt-3 mb-1 font-semibold'>Add new contact</h3>
            <PersonForm PersonFormData={PersonFormData} />
            <h3 className='mt-3 mb-1 font-semibold'>Numbers</h3>
            <Persons contacsToShow={contacsToShow} handleDelete={handleDelete} filter={filter} />
        </div>
    )
}

export default App
