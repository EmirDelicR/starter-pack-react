import { Application } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { middleware } from 'src/middleware/middleware';

import {
  authRouter,
  contactRouter,
  todoRouter,
  userRouter
} from 'src/routes/route';

import { swaggerDocument } from 'src/swagger/swagger';

const registerRoutes = (app: Application) => {
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
  app.use(authRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  /** verify JWT on route below */
  app.use(middleware.verifyJWT);
  app.use(todoRouter);
  app.use(contactRouter);
  app.use(userRouter);
};

export default registerRoutes;
