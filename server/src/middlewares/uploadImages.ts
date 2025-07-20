import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';
import { errorHandler } from './handleErrors';

// Настройка хранения в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

type FilesArrayOrMap =
  | Express.Multer.File[]
  | { [fieldname: string]: Express.Multer.File[] };

// Расширяем Request, чтобы добавить `imageUrl`
export interface ImageRequest extends Request {
  file?: Express.Multer.File;
  imageUrl?: string;
}

export interface MultipleImagesRequest extends Request {
  files?: FilesArrayOrMap; // точно массив
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
  upload.array('images', 4),

  // Приводим тип вручную через any => кастим req внутри
  (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        if (!Array.isArray(req.files)) {
          return next(errorHandler(400, 'Expected files to be an array'));
        }

        const typedReq = req as MultipleImagesRequest;

        if (!Array.isArray(typedReq.files) || typedReq.files.length === 0) {
          return next(errorHandler(400, 'At least one image is required'));
        }

        const results = await Promise.all(
          typedReq.files.map((file) => streamUpload(file.buffer))
        );

        typedReq.imageUrls = results.map((r) => r.secure_url);
        next();
      } catch (err) {
        console.error(err);
        next(errorHandler(500, 'Multiple image upload failed'));
      }
    })();
  },
];
