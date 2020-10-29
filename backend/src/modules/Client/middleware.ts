import { NextFunction, Request, Response, RequestHandler } from 'express';

import ClientValidator from './validations';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default class ClientMiddleware {
  public static storage = multer.diskStorage({
    destination: './public/uploads',

    filename: (req: Request, file: Express.Multer.File, callback) => {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

      req.body.avatar = fileName;

      callback(null, fileName);
    },
  });

  public static uploads: {
    avatar: RequestHandler;
  } = {
    avatar: multer({
      storage: ClientMiddleware.storage,
    }).fields([{ name: 'avatar', maxCount: 1 }]),
  };

  constructor() {}

  static validateGet(req: Request, res: Response, next: NextFunction) {
    ClientValidator.validateGet(req.params, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    ClientValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    console.log('validateUpdate');

    ClientValidator.validateUpdate(req.params, req.body, (error) => {
      if (error) {
        console.log(error);

        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
