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

export interface MultipleImagesRequest extends Request {
  files?: Express.Multer.File[];
  imageUrls?: string[];
  userId?: string;
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
      throw errorHandler(500, 'Image upload failed');
    }
  },
];

export const uploadMultiplyImages = [
  upload.array('images', 4), // до 4 файлов с ключом "images"

  async (req: MultipleImagesRequest, _res: Response, next: NextFunction) => {
    try {
      /* ----- наличие файлов обязательно ----- */
      if (!req.files || req.files.length === 0)
        return next(errorHandler(400, 'At least one image is required'));

      const results = await Promise.all(
        req.files.map((file) => streamUpload(file.buffer))
      );

      req.imageUrls = results.map((r) => r.secure_url);
      next();
    } catch (err) {
      console.error(err);
      next(errorHandler(500, 'Multiple image upload failed'));
    }
  },
];
