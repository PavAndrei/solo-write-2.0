import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    role: {
      type: String,
      default: 'user',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('comments', {
  ref: 'Comment', // Модель, с которой связываем
  localField: '_id', // Поле в модели User
  foreignField: 'userData', // Поле в модели Comment
  justOne: false, // Получаем массив комментариев
});

userSchema.virtual('commentsCount').get(function () {
  return this.comments?.length || 0;
});

userSchema.virtual('articlesCount').get(function () {
  return this.articles?.length || 0;
});

userSchema.virtual('popularArticles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'user',
  options: {
    sort: { viewsCount: -1 },
    limit: 3,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
