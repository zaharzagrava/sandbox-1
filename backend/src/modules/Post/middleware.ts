import { NextFunction, Request, RequestHandler, Response } from 'express';

import PostValidator from './validations';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default class PostMiddleware {
  public static storage = multer.diskStorage({
    destination: './public/uploads/tmp/',

    filename: (req: Request, file: Express.Multer.File, callback) => {
      console.log('@multimedia');
      console.log(req.body.multimedia);

      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

      if (!Array.isArray(req.body.multimedia)) req.body.multimedia = [];
      req.body.multimedia.push(fileName);

      callback(null, fileName);
    },
  });

  public static uploads: {
    multimedia: RequestHandler;
  } = {
    multimedia: multer({
      storage: PostMiddleware.storage,
    }).array('multimedia', 10),
  };

  constructor() {}

  static validateGetAll(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateGetAll(req.query, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateGetDelete(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateGetDelete(req.params, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateUpdate(req.params, req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
