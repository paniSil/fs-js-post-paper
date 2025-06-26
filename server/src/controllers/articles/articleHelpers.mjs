import Article from '../../models/Article.mjs'

const findArticleByTitle = async (title) => {
    return await Article.findOne({ title });
}

const createArticleInDb = async ({
    title,
    description,
    text,
    authorId,
    likes,
    paperclips,
    cover
}) => {
    const newArticle = new Article({
        title,
        description,
        text,
        authorId,
        likes,
        paperclips,
        cover
    });

    const result = await newArticle.save();
    return result;
}
export { findArticleByTitle, createArticleInDb }