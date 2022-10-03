require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const Note = require('./models/note');
const Contact = require('./models/contact');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));
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

app.get('/api/contacts', (req, res) => {

    Contact.find({}).then(notes => {
        res.json(notes).status(200);
    });
})

app.post('/api/contacts', async (req, res, next) => {
    const { name, number } = req.body;

    if (!number) {
        return res.status(400).json({
            message: 'Provide a number'
        })
    }

    if (!name) {
        return res.status(400).json({
            message: 'Provide a name'
        })
    }

    const newContact = new Contact({ name, number });
    const updatedContactList = await newContact.save();
    const latestContactList = await Contact.find({});
    try {
        res.status(201).json(latestContactList);
    } catch (error) {
        res.status(500).json(error);
    }

})

app.get('/api/contacts/info', (req, res, next) => {
    Contact.find({})
        .then(result => {
            const message = `Phonebook has info of <strong>${result.length} contacts.</strong> <br /> <br /> <strong>Date:</strong> ${new Date()}`;
            return res.status(200).send(message);
        })
        .catch(error => next(error));
})

app.get('/api/contacts/:id', (req, res, next) => {
    let { id } = req.params;

    Contact.findById(id)
        .then(contact => {
            if (contact) {
                return res.status(200).json(contact)
            }
            return res.status(404).json({ error: `No contact found at id: ${id}!` });
        })
        .catch(error => next(error));
})

app.delete('/api/contacts/:id', (req, res, next) => {
    let { id } = req.params;

    Contact.findByIdAndRemove(id)
        // Handle if user tries to delete non-existing resource from database
        .then(result => {
            if (result) {
                return res.status(204).end()
            }
            return res.status(404).json({ message: "Contact not found!" });
        })
        .catch(error => next(error));
})

app.put('/api/contacts/:id', (req, res, next) => {
    const { number } = req.body;
    const { id } = req.params;

    const updatedNumber = { number };

    Contact.findByIdAndUpdate(id, updatedNumber, { new: true })
        .then(updatedContact => res.json(updatedContact))
        .catch(error => next(error));
})

// Middlewares
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error);
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// this has to be the last loaded middleware.
app.use(errorHandler);

// Connect to Mongodb & Server
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log('Server is running on port 3001');
        })
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });