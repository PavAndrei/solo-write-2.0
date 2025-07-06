import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';
import { errorHandler } from './handleErrors';

// Настройка хранения в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Расширяем Request, чтобы добавить `imageUrl`
export interface ImageRequest extends Request {
  file?: Express.Multer.File;
  imageUrl?: string;
}

// Обёртка для загрузки в Cloudinary
const streamUpload = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' }, // необязательно
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result);
      }
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

// Middleware
export const uploadImage = [
  upload.single('image'),

  async (req: ImageRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) return next();

      const result = await streamUpload(req.file.buffer);
      req.imageUrl = result.secure_url;

      next();
    } catch (err) {
      console.error(err);
      //   res.status(500).json({ message: 'Image upload failed' });
      throw errorHandler(500, 'Image upload failed');
    }
  },
];
