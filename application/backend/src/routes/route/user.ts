import { Router } from 'express';

import { userController } from 'src/controllers/user';

import upload from 'src/util/upload/storage';

const userRouter = Router();
/** GET /user */
userRouter.get('/user/:id', userController.getUser);

/** UPDATE /user/:id */
userRouter.patch(
  '/user/:id',
  upload.single('image'),
  userController.updateUser
);

export { userRouter };
