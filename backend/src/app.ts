import { Application, NextFunction, Request, Response } from 'express';
import Routes from './routes/';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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
    /* Setting up cors */
    const whitelist = [
      'http://localhost:3000', // for dev

      undefined, // for postman agent
    ];

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        console.log('@origin');
        console.log(origin);

        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    };
    this.app.use(cors(corsOptions));

    /* Setting up json */
    this.app.use(bodyParser.json());
    /* Setting up cookies */
    this.app.use(cookieParser());

    /* Setting up logging */
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
