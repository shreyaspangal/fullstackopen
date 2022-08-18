const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

const generateId = () => {
    return Math.floor(Math.random() * 10000000 + 1);
}

app.get('/api/persons', (req, res) => {
    res.json(persons).status(200);
})

app.get('/api/persons/:id', (req, res) => {
    let { id } = req.params;

    const person = persons.find(person => person.id === Number(id));
    console.log('person', person)
    if (person) {
        return res.json(person).status(200);
    } else {
        return res.status(404).json({
            error: 'person not found!'
        })
    }
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    const person = { "id": generateId(), name, number };

    if (!number) {
        return res.status(400).json({
            error: 'Provide a number'
        })
    }

    if (!name) {
        return res.status(400).json({
            error: 'Provide a name'
        })
    }

    const newPersons = persons.concat(person);

    res.json(newPersons).send(200);
})

app.delete('/api/persons/:id', (req, res) => {
    let { id } = req.params;

    const filteredPersons = persons.filter(person => person.id !== Number(id));
    persons = filteredPersons;
    res.sendStatus(204);
})

app.get('/info', (req, res) => {
    const message = `Phonebook has info for ${persons.length} people <br /> <br /> ${new Date()}`;
    res.send(message).status(200);
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log('Server is running on port 3001');
})