import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Article title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [120, 'Title cannot be more than 100 characters long'],
        unique: [true, "Title is already exists"],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Article text is required'],
        minlength: [10, 'Text must be at least 10 characters long'],
        maxlength: [240, 'Title cannot be more than 240 characters long']
    },
    text: {
        type: String,
        required: [true, 'Article text is required'],
        minlength: [10, 'Text must be at least 10 characters long']
    },
    likes: { type: Number, default: 0 },
    paperclips: { type: Number, default: 0 },
    cover: { type: String }
}, { timestamps: true })

const Article = mongoose.model('Article', ArticleSchema)
export default Article

