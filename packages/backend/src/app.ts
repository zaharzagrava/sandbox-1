import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { buildSchema, registerEnumType } from 'type-graphql';

import { ClientResolver } from './resolvers/client';
import { Context } from './types';

import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  // /* Building type-graphql schema */
  // const schema = await buildSchema({
  //   resolvers: [ClientResolver]
  // });

  // /* Building apollo server */
  // const apolloServer = new ApolloServer({
  //   schema,
  //   context: (ctx: Context) => ctx
  // });

  const expressServer: Application = express();

  /* Setting up cors */
  const whitelist = [
    'http://localhost:3000', // for dev
    'http://localhost', // for production
    undefined // for postman agent
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
    credentials: true
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
  expressServer.use((req: Request, res: Response, next: NextFunction) => {
    console.log('@req.url');
    console.log(req.url);

    console.log('@req.body');
    console.log(req.body);

    console.log('@req.query');
    console.log(req.query);

    next();
  });

  // apolloServer.applyMiddleware({ app: expressServer, path: '/graphql' });

  expressServer.listen(process.env.PORT || 4001, () => {
    console.log(`Express server is listening on port ${process.env.PORT || 4001}, on path /graphql`);
  });
};

main();
