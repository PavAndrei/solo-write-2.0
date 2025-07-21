import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    categories: {
      type: Array,
      required: true,
      default: [],
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: Array,
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
