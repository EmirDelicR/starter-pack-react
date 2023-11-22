import { Router } from 'express';

import { todoController } from 'src/controllers/todo';

const todoRouter = Router();
/** GET /todo */
todoRouter.get('/todo/:userId', todoController.getItems);

/** GET /todo/paginated/:userId?page=1&pageSize=1&isMobile=false */
todoRouter.get('/todo/paginated/:userId', todoController.getPaginatedItems);

/** POST /todo */
todoRouter.post('/todo', todoController.addItem);

/** DELETE /todo */
todoRouter.delete('/todo/:id', todoController.deleteItem);

/** UPDATE /todo */
todoRouter.patch('/todo/:id', todoController.updateItem);

export { todoRouter };
