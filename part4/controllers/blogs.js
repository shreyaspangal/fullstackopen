const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
    Blog.find({})
        .then(result => res.status(200).json(result))
        .catch(error => console.log(error));
});

blogRouter.post('/', (req, res, next) => {
    const newBlog = new Blog(req.body);

    newBlog.save()
        .then(result => res.status(201).json(result))
        .catch(error => console.log(error));
});

module.exports = blogRouter;