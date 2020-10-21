import { Application, NextFunction, Router } from 'express';
import PostController from '../modules/Post/controller';
import PostMiddleware from '../modules/Post/middleware';

import ClientController from '../modules/Client/controller';
import ClientMiddleware from '../modules/Client/middleware';

// import ClientMiddleware from '../modules/Client/middleware';
// import ClientMiddleware from '../modules/Client/middleware';

// import ClientMiddleware from '../modules/Client/middleware';
// import ClientMiddleware from '../modules/Client/middleware';

export default class Routes {
  constructor(private app: Application) {
    this.app = app;

    this.init();
  }

  private init() {
    /* Clients */

    this.app.get('/clients', ClientController.getAll);

    this.app.get(
      '/clients/:id',
      ClientMiddleware.validateGetDelete,
      ClientController.get
    );

    this.app.post(
      '/clients',
      ClientMiddleware.validateCreate,
      ClientController.create
    );

    this.app.delete(
      '/clients/:id',
      ClientMiddleware.validateGetDelete,
      ClientController.delete
    );

    this.app.put(
      '/clients/:id',
      ClientMiddleware.validateUpdate,
      ClientController.update
    );

    /* Posts */

    this.app.get('/posts', PostController.getAll);

    this.app.get(
      '/posts/:id',
      PostMiddleware.validateGetDelete,
      PostController.get
    );

    this.app.post(
      '/posts',
      PostMiddleware.validateCreate,
      PostController.create
    );

    this.app.delete(
      '/posts/:id',
      PostMiddleware.validateGetDelete,
      PostController.delete
    );

    this.app.put(
      '/posts/:id',
      PostMiddleware.validateUpdate,
      PostController.update
    );

    // /* Comments */

    // this.app.get(
    //   '/clients',
    //   CommentMiddleware.validateGetAll,
    //   ClientController.getAll
    // );

    // this.app.get(
    //   '/clients:id',
    //   CommentMiddleware.validateGet,
    //   ClientController.get
    // );

    // this.app.post(
    //   '/clients',
    //   CommentMiddleware.validateCreate,
    //   ClientController.create
    // );

    // this.app.delete(
    //   '/clients:id',
    //   CommentMiddleware.validateDelete,
    //   ClientController.delete
    // );

    // this.app.put(
    //   '/clients:id',
    //   CommentMiddleware.validateUpdate,
    //   ClientController.update
    // );

    /* Hashtags */

    /* Tags */
  }
}
