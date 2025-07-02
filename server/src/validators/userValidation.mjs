import { Joi, celebrate, Segments } from "celebrate"

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(100),
    age: Joi.number().min(0).max(110),
    articleId: Joi.string(),
    articles: Joi.array().items(Joi.string()),
    paperclips: Joi.array().items(Joi.string()),
})

const validateUserBody = celebrate({
    [Segments.BODY]: userSchema
})

const validateParamsUserId = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
})

export { validateUserBody, validateParamsUserId }
