const joi = require("joi");

const name = "taskMiddleware";

const verify = (request, responce, next) => {
    const schema = joi.object().keys({
        user_id: joi
            .number()
            .integer()
            .required(),
        begin_time: joi
            .date()
            .min("1-1-2000")
            .required(),
        end_time: joi
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
    verify,
    name
};
