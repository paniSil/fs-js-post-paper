import { Joi, celebrate, Segments } from "celebrate"

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(100),
    age: Joi.number().min(0).max(110),
    articleId: Joi.string().hex().length(24),
    articles: Joi.array().items(Joi.string().hex().length(24)),
    paperclips: Joi.array().items(Joi.string().hex().length(24)),
})

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(100).optional(),
    age: Joi.number().min(0).max(110).optional(),
    articleId: Joi.string().hex().length(24).optional(),
    avatar: Joi.string().uri().optional(),
    articles: Joi.array().items(Joi.string().hex().length(24)).optional(),
    paperclips: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const validateUserBody = celebrate({
    [Segments.BODY]: userSchema
})

const validateUserBodyUpdate = celebrate({
    [Segments.BODY]: updateUserSchema
})


const validateParamsUserId = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
})

export { validateUserBody, validateParamsUserId, validateUserBodyUpdate }
