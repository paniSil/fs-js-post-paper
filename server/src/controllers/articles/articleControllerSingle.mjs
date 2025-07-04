import Article from '../../models/Article.mjs';
import { findArticleByTitle, createArticleInDb } from './articleHelpers.mjs';


const postArticleHandler = async (req, res) => {
    const { title,
        description,
        text,
        cover } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const authorId = req.user?._id;
        const existingArticle = await findArticleByTitle(title);
        if (existingArticle) {
            return res.status(409).json({ message: 'Title is taken' });
        }

        const newArticle = await createArticleInDb({
            title,
            description,
            text,
            authorId,
            cover
        })

        res.status(201).json({
            message: 'Article created!',
            articleId: newArticle._id,
            article: newArticle,
        });
    } catch (error) {
        console.error('Error: post article error', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getArticleByIdHandler = async (req, res) => {
    try {

        const articleId = req.params.id;
        const article = await Article.findById(articleId);
        const theme = req.cookies.theme || 'light';

        if (req.path === '/api' || (req.headers.accept && req.headers.accept.includes('application/json'))) {
            res.status(200).json({ article });
        } else if (article) {
            res.render('article.ejs', { article: article, theme: theme, user: req.user });
        } else {
            res.status(404).send('Article Not Found');
        }
    } catch (error) {
        console.error('Error: get article by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const putArticleByIdHandler = async (req, res) => {
    try {

        const articleId = req.params.id;
        const { title, text, paperclipsIncrement, likedBy, likes } = req.body;
        const updates = {};
        console.log(likedBy, likes)
        if (title) updates.title = title;
        if (text) updates.text = text;

        let updateQuery = {};
        if (Object.keys(updates).length > 0) {
            updateQuery.$set = updates;
        }

        if (typeof paperclipsIncrement === "number") {
            updateQuery.$inc = { paperclips: paperclipsIncrement };
        }

        if (Array.isArray(likedBy) && typeof likes === "number") {
            updateQuery.$set = { ...updateQuery.$set, likedBy, likes };
        }

        if (Object.keys(updateQuery).length === 0) {
            return res.status(400).json({ message: 'No update data' });
        }

        const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            updateQuery,
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Статтю не знайдено.' });
        }
        res.status(200).json({ message: `Article ${articleId} is updated`, article: updatedArticle });
    } catch (error) {
        console.error('Error: put article by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const replaceArticleHandler = async (req, res) => {
    try {
        const { query, replacement } = req.body

        if (!query || Object.keys(query).length === 0 || !replacement || Object.keys(replacement).length === 0) {
            return res.status(400).json({ message: 'Query or replacement was not provided' });
        }

        const originalArticle = await Article.findOne(query);
        const createdAt = originalArticle ? originalArticle.createdAt : new Date();

        const result = await Article.replaceOne(
            query,
            { ...replacement, createdAt: createdAt },
            { runValidators: true }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Article for replacement was not found' });
        }

        res.status(200).json({
            message: 'Article is replaced',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error: put article by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteArticleByIdHandler = async (req, res) => {
    try {
        const articleId = req.params.id;
        const result = await Article.findByIdAndDelete(articleId);
        if (!result) {
            return res.status(404).json({ message: 'Статтю не знайдено.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error: delete article by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { postArticleHandler, getArticleByIdHandler, putArticleByIdHandler, deleteArticleByIdHandler, replaceArticleHandler }