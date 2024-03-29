const express = require('express');
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const contactsRoutes = require('./controllers/contacts');
const middleware = require('./utils/middleware');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to Mongodb & Server
logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/contacts', contactsRoutes);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;