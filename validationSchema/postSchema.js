const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    filename: Joi.string().regex(/^[a-zA-Z0-9-_]+\.(jpg|jpeg|png|gif)$/).required()
});

module.exports = postSchema;
