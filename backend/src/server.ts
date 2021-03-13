import express from 'express';

import 'dotenv/config';

import App from './app';

const server = new App(Number(process.env.PORT || 4001), express());

server.start();
