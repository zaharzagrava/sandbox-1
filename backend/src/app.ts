import { error } from 'console';
import express, { Application, NextFunction, Request, Response } from 'express';
import Routes from './routes/';
// has to be before every custom module

// need to import to create relations between models

export default class App {
  constructor(private port: number | undefined, private app: Application) {
    this.port = port || 4000;
    this.app = app;

    this.initRequsetMiddleware();
    this.initRoutes();
    this.initErrorMiddleware();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Express server is listening on port ${this.port}`);
    });
  }

  private initRequsetMiddleware() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log('@req.url');
      console.log(req.url);

      next();
    });
  }

  private initRoutes() {
    new Routes(this.app);
  }

  private initErrorMiddleware() {
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log('@error');
        console.log(error);
        console.log(typeof error);

        // res.status(500).json(error);
        res.status(404).send({
          message: error.message,
          name: error.name,
          stack: error.stack,
        });

        next();
      }
    );
  }
}
