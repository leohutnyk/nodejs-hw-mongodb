import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import contactsRouter from './routes/contactsRouter.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
