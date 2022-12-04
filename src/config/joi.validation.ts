import * as Joi from 'joi'

export const JoinValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6)
});

//aqui lo que hacemos es validar nuestras varibales de entorno