import { Application } from 'express';

import ClientController from '../modules/Client/controller';
import ClientMiddleware from '../modules/Client/middleware';

import PostController from '../modules/Post/controller';
import PostMiddleware from '../modules/Post/middleware';

import CommentController from '../modules/Comment/controller';
import CommentMiddleware from '../modules/Comment/middleware';

import SessionController from '../modules/Session/controller';
import SessionMiddleware from '../modules/Session/middleware';

export default class Routes {
  constructor(private app: Application) {
    this.app = app;

    this.init();
  }

  private init() {
    /* Session */

    this.app.get(
      '/session',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      SessionController.get
    );
    this.app.post(
      '/session',
      SessionMiddleware.validateLogin,
      SessionController.login
    );
    this.app.delete(
      '/session',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      SessionController.logout
    );

    /* Clients */

    this.app.get('/clients', ClientController.getAll);

    this.app.get(
      '/clients/:id',
      ClientMiddleware.validateGet,
      ClientController.get
    );

    this.app.post(
      '/clients',
      ClientMiddleware.validateCreate,
      ClientMiddleware.uploads.avatar,
      ClientController.create
    );

    this.app.delete(
      '/clients',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      ClientController.delete
    );

    this.app.put(
      '/clients',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      ClientMiddleware.validateUpdate,
      ClientMiddleware.uploads.avatar,
      ClientController.update
    );

    this.app.put(
      '/clients/password',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      ClientMiddleware.validateUpdatePassword,
      ClientController.updatePassword
    );

    /* Posts */

    this.app.get(
      '/posts',
      PostMiddleware.validateGetAll,
      PostController.getAll
    );

    this.app.get(
      '/posts/:id',
      PostMiddleware.validateGetDelete,
      PostController.get
    );

    this.app.post(
      '/posts',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      PostMiddleware.validateCreate,
      PostMiddleware.uploads.multimedia,
      PostController.create
    );

    this.app.delete(
      '/posts/:id',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      PostMiddleware.validateGetDelete,
      PostController.delete
    );

    this.app.put(
      '/posts/:id',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      PostMiddleware.validateUpdate,
      PostMiddleware.uploads.multimedia,
      PostController.update
    );

    /* Comments */

    this.app.get('/comments', PostController.getAll);

    this.app.get(
      '/comments/:id',
      CommentMiddleware.validateGetDelete,
      CommentController.get
    );

    this.app.post(
      '/comments',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      CommentMiddleware.validateCreate,
      CommentController.create
    );

    this.app.delete(
      '/comments/:id',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      CommentMiddleware.validateGetDelete,
      CommentController.delete
    );

    this.app.put(
      '/comments/:id',
      SessionMiddleware.validateVerify,
      SessionController.verify,
      CommentMiddleware.validateUpdate,
      CommentController.update
    );

    /* Hashtags */

    /* Tags */
  }
}
