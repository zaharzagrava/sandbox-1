import express, { Application, NextFunction, Request, Response } from 'express';

import 'dotenv/config';

import App from './app';

const server = new App(Number(process.env.PORT), express());

server.start();
