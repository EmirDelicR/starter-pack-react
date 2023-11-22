import { Router } from 'express';

import { authController } from 'src/controllers/auth';

const authRouter = Router();
/** POST /login */
authRouter.post('/login', authController.signIn);

/** POST /autoLogin */
authRouter.post('/autoLogin', authController.autoSignIn);

/** POST /register */
authRouter.post('/register', authController.signUp);

/** GET /refresh */
authRouter.get('/refresh', authController.updateToken);

export { authRouter };
