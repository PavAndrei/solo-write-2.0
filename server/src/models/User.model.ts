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
