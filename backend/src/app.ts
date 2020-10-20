import express, { Application, NextFunction, Request, Response } from 'express';
import Routes from './routes/';
// has to be before every custom module

// need to import to create relations between models

export default class App {
  constructor(private port: number | undefined, private app: Application) {
    this.port = port || 4000;
    this.app = app;

    this.initRoutes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Express server is listening on port ${this.port}`);
    });
  }

  private initRoutes() {
    new Routes(this.app);
  }
}
