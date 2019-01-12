const joi = require("joi");

const name = "taskMiddleware";

const create = (request, responce, next) => {
    const schema = joi.object().keys({
        author_id: joi.string().required(),
        // author_first_name: joi.string().required(),
        // author_last_name: joi.string().required(),
        // author_image: joi.string().required(),
        project_id: joi.string().required(),
        name: joi
            .string()
            .min(1)
            .required(),
        description: joi
            .string()
            .min(1),
        checklist: joi.string(),
        deadline: joi.date().min("now"),
        assignees: joi.string(),
        labels: joi.string(),
        created_at: joi
            .date()
            .min("1-1-2000")
            .required()
    });

    const result = joi.validate(request.body, schema, { abortEarly: false });

    if (result.error === null) {
        next();
    } else {
        responce.status(400).send(result.error);
    }
};

module.exports = {
    create,
    name
};
