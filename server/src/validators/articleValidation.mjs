import { Joi, celebrate, Segments } from "celebrate"

const articleSchema = Joi.object({
    title: Joi.string().min(3).max(120),
    description: Joi.string().required().min(10).max(240),
    text: Joi.string().required().min(3),
    cover: Joi.string().uri()
})

const updateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(120),
    description: Joi.string().min(10).max(240),
    text: Joi.string().min(3),
    cover: Joi.string().uri(),
    paperclipsIncrement: Joi.number(),
    likedBy: Joi.array().items(Joi.string()),
    likes: Joi.number()
});

const updateManyArticlesSchema = Joi.object({
    filter: Joi.object().min(1).required().pattern(Joi.string(), Joi.any()),
    update: Joi.object().min(1).required().pattern(Joi.string(), Joi.any()),
}).required();

const replaceArticleSchema = Joi.object({
    query: Joi.object().min(1).required().pattern(Joi.string(), Joi.any()),
    replacement: Joi.object().min(1).required()
}).required();

const validateArticleBody = celebrate({
    [Segments.BODY]: articleSchema
})

const validateUpdateArticleBody = celebrate({
    [Segments.BODY]: updateArticleSchema
});

const validateUpdateManyArticlesBody = celebrate({
    [Segments.BODY]: updateManyArticlesSchema
});

const validateParamsArticleId = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    })
})

const validateReplaceArticle = celebrate({
    [Segments.BODY]: replaceArticleSchema
}, { abortEarly: false });

export { validateArticleBody, validateUpdateArticleBody, validateParamsArticleId, validateUpdateManyArticlesBody, validateReplaceArticle }
