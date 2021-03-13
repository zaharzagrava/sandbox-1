import 'reflect-metadata';
import 'newrelic';

// @ts-ignore
import newRelicApolloServerPlugin from '@newrelic/apollo-server-plugin';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';

import { Server } from 'socket.io';
import { createServer } from 'http';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';

import { l } from './logger';
import { Context } from './types';
import { UserResolver } from './modules/user/resolver';
import { EventResolver } from './modules/event/resolver';
import { DocumentResolver } from './modules/document/resolver';
import { NotificationResolver } from './modules/notification/resolver';

dotenv.config();

const main = async () => {
  /* Building type-graphql schema */
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      EventResolver,
      DocumentResolver,
      NotificationResolver,
    ],
  });

  /* Building apollo server */
  const apolloServer = new ApolloServer({
    schema,
    context: (ctx: Context) => ctx,
    plugins: [newRelicApolloServerPlugin],
  });

  const whitelist = [
    'http://localhost:3000', // for dev
    'http://localhost', // for production
  ];

  const expressServer: Application = express();
  const httpServer = createServer(expressServer);
  const ioServer = new Server(httpServer, {
    cors: {
      origin: whitelist,
    },
  });

  ioServer.on('connection', (socket: any) => {
    socket.emit('hello', 'world');

    socket.on('message', (message: any) => {
      console.log(message);
    });
  });

  /* Setting up cors */
  const corsOptions: cors.CorsOptions = {
    origin: whitelist,
    credentials: true,
  };

  expressServer.use(cors(corsOptions));

  /* Setting up compression */
  expressServer.use(compression());
  /* Setting up json */
  expressServer.use(express.json());
  /* Setting up cookies */
  expressServer.use(cookieParser());
  /* Setting up static files serving */
  expressServer.use(express.static('./public'));

  /* Setting up logging */
  expressServer.use(
    (req: Request, res: Response, next: NextFunction) => {
      next();
    },
  );

  apolloServer.applyMiddleware({
    app: expressServer,
    path: '/graphql',
  });

  httpServer.listen(process.env.PORT || 4001, () => {
    l.log({
      level: 'info',
      message: `🚀 Express server is running at ${
        process.env.PORT || 4001
      }`,
    });
  });
};

main();
