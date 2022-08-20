const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :body'));

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
        return res.status(200).json(person);
    } else {
        return res.status(404).json({
            error: 'person not found!'
        });
    }
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    const duplicateName = persons.find(person => person.name === name);

    if (duplicateName) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

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

    const person = { "id": generateId(), name, number };

    const newPersons = persons.concat(person);

    res.status(201).json(newPersons);
})

app.delete('/api/persons/:id', (req, res) => {
    let { id } = req.params;

    const filteredPersons = persons.filter(person => person.id !== Number(id));
    persons = filteredPersons;
    res.sendStatus(204);
})

app.get('/info', (req, res) => {
    const message = `Phonebook has info for ${persons.length} people <br /> <br /> ${new Date()}`;
    res.status(200).send(message);
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server is running on port 3001');
})