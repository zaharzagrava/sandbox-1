import { Application, NextFunction, Router } from 'express';

import ClientController from '../modules/Client/controller';
import ClientMiddleware from '../modules/Client/middleware';

export default class Routes {
  constructor(private app: Application) {
    this.app = app;

    this.init();
  }

  private init() {
    this.app.get('/clients', ClientController.getAll);

    this.app.get('/clients:id');

    this.app.post(
      '/clients',
      ClientMiddleware.validateCreate,
      ClientController.create
    );

    this.app.delete('/clients:id', async (req, res) => {
      /* Delete client from DB */
    });

    this.app.put('/clients:id', async (req, res) => {
      /* Update info about requested client */
    });

    this.app.get('/post:id', async (req, res) => {
      /* Get info about department */
    });

    this.app.get('/post', async (req, res) => {
      /* Get info about departments */
    });

    this.app.post('/post', async (req, res) => {
      /* Create new department */
    });

    this.app.delete('/post:id', async (req, res) => {
      /* Delete department */
    });

    this.app.put('/post:id', async (req, res) => {
      /* Update info about department */
    });
  }
}
