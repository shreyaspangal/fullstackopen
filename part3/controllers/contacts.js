const contactsRouter = require('express').Router();
const Contact = require('../models/contact');


contactsRouter.get('/', (req, res, next) => {

    Contact.find({})
        .then(notes => {
            res.json(notes).status(200);
        })
        .catch(error => next(error));
});

contactsRouter.post('/', (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: 'Please provide both, Name and Number.'
        });
    }

    const newContact = new Contact({ name, number });
    newContact.save()
        .then(result => res.status(201).json(result))
        .catch(error => next(error));

});

contactsRouter.get('/info', (req, res, next) => {
    Contact.find({})
        .then(result => {
            const message = `Phonebook has info of <strong>${result.length} contacts.</strong> <br /> <br /> <strong>Date:</strong> ${new Date()}`;
            return res.status(200).send(message);
        })
        .catch(error => next(error));
});

contactsRouter.get('/:id', (req, res, next) => {
    let { id } = req.params;

    Contact.findById(id)
        .then(contact => {
            if (contact) {
                return res.status(200).json(contact);
            }
            return res.status(404).json({ error: `No contact found at id: ${id}!` });
        })
        .catch(error => next(error));
});

contactsRouter.delete('/:id', (req, res, next) => {
    let { id } = req.params;

    Contact.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                return res.status(204).end();
            }
            // If user tries to delete non-existing resource from database
            return res.status(404).json({ error: 'Contact not found!' });
        })
        .catch(error => next(error));
});

contactsRouter.put('/:id', (req, res, next) => {
    const { number } = req.body;
    const { id } = req.params;

    if (!number) {
        return res.status(400).json({
            error: 'Please provide a new Number.'
        });
    }

    const updatedNumber = { number };

    Contact.findByIdAndUpdate(id, updatedNumber, { new: true, runValidators: true, context: 'query' })
        .then(updatedContact => res.json(updatedContact))
        .catch(error => next(error));
});

module.exports = contactsRouter;