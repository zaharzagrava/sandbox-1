import express, { Application, NextFunction, Request, Response } from 'express';

// has to be before every custom module
import 'dotenv/config';

// need to import to create relations between models

console.log('@1');
console.log(process.env.DB_HOST);
const main = async () => {
  const app: Application = express();

  app.use(async function authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    /* Authorize the user */
  });

  app.get('/clients', async (req, res) => {
    /* Get info about clients */
  });

  app.get('/clients:id', async (req, res) => {
    /* Get info about client */
  });

  app.post('/clients', async (req, res) => {
    /* Create new client */
  });

  app.delete('/clients:id', async (req, res) => {
    /* Delete client from DB */
  });

  app.put('/clients:id', async (req, res) => {
    /* Update info about requested client */
  });

  app.get('/post:id', async (req, res) => {
    /* Get info about department */
  });

  app.get('/post', async (req, res) => {
    /* Get info about departments */
  });

  app.post('/post', async (req, res) => {
    /* Create new department */
  });

  app.delete('/post:id', async (req, res) => {
    /* Delete department */
  });

  app.put('/post:id', async (req, res) => {
    /* Update info about department */
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Express server is listening on port ${process.env.PORT || 4000}`
    );
  });
};

main();
