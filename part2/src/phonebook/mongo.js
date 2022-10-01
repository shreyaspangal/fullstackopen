const mongoose = require('mongoose');

const password = 'm001-mongodb-basics';
const url = `mongodb+srv://m001-student:${password}@sandbox.qompnsc.mongodb.net/contacts?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

if (process.argv.length < 4) {
    console.log('Please provide the name as an argument: node mongo.js <password> <name>');
    process.exit(1);
}

if (process.argv.length < 5) {
    console.log('Please provide the phone number as an argument: node mongo.js <password> <name> <phone>');
    process.exit(1);
}

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
});

const Contact = mongoose.model('Contact', contactSchema);

async function getAllContacts() {
    const getContacts = await Contact.find({});
    console.log('phonebook:');
    getContacts.forEach(({ name, number }) => {
        console.log(`=> ${name} ${number}`);
    });
}

mongoose
    .connect(url)
    .then(result => {
        console.log('connected');

        if (process.argv.length === 3) {
            return getAllContacts()
                .then(() => {
                    return mongoose.connection.close();
                })
        }

        const contact = new Contact({
            name: process.argv[3],
            number: process.argv[4],
        })

        return contact.save();
    })
    .then(result => {
        if (result) {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
            return mongoose.connection.close();
        }
    })
    .catch(error => {
        console.log(error);
    });