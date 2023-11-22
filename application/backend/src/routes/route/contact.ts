import { Router } from 'express';

import { contactController } from 'src/controllers/contact';

const contactRouter = Router();
/** POST /sendMessage */
contactRouter.post('/sendMessage', contactController.sendMessage);

/** GET /getEmails */
contactRouter.get('/getEmails', contactController.getEmails);

/** GET /getEmails/paginated?page=1&pageSize=1&columnId=''&filter=''&desc=false */
contactRouter.get('/getEmails/paginated', contactController.getPaginatedEmails);

export { contactRouter };
