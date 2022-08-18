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

app.get('/info', (req, res) => {
    const message = `Phonebook has info for ${persons.length} people <br /> <br /> ${new Date()}`;
    res.send(message).status(200);
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log('Server is running on port 3001');
})