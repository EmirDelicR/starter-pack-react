import { Application } from 'express';
import path from 'path';

import { middleware } from 'src/middleware';

import {
  authRouter,
  contactRouter,
  todoRouter,
  userRouter
} from 'src/routes/route';

import { generateSwaggerDocs } from 'src/swagger';

const registerRoutes = (app: Application) => {
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
  app.use(authRouter);
  generateSwaggerDocs(app);
  /** verify JWT on route below */
  app.use(middleware.verifyJWT);
  app.use(todoRouter);
  app.use(contactRouter);
  app.use(userRouter);
};

export default registerRoutes;
