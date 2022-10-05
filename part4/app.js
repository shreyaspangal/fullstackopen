const config = require('./utils/config');
const express = require('express');
const app = express();
const blogRoutes = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('connecting to mongoDB...');

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log(`connected to mongoDB!`);
    })
    .catch(error => next(error));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRoutes);

module.exports = app;