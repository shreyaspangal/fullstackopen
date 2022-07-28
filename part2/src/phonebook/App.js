import { useEffect, useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState("");

    //Common variable for holding person data to display
    const contacsToShow = !filter ? persons : persons.filter(person => {
        return Object.values(person).join('').toLowerCase().includes(filter.toLowerCase());
    });

    // Helper function for handling common onchange events
    const handleOnChange = () => (event, setFunc) => {
        setFunc(event.target.value)
    }
    // Custom onChange handler
    const onChange = handleOnChange();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check for duplicate contacts
        const handleDuplicateContact = persons.find(person => person.name === newName);
        if (handleDuplicateContact) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        // If new contact, then update the contacts list
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }));
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Filter: <input type="text" value={filter} onChange={(e) => onChange(e, setFilter)} />
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Add new contact</h3>
                <div>
                    name: <input type="text" value={newName} onChange={(e) => onChange(e, setNewName)} />
                </div>
                <div>
                    number: <input type="number" value={newNumber} onChange={(e) => onChange(e, setNewNumber)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {!contacsToShow.length ? 'No match found! - try again with another name.' : contacsToShow.map((person) => <div key={person.id}>{person.name}{" "}{person.number}</div>)}
        </div>
    )
}

export default App
