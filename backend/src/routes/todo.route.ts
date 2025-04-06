import { Router } from 'express';
import container from '../utils/iocContainer.util';
import asyncHandler from '../utils/asyncHandler.util';
import tokenMiddleware from '../middlewares/token.middleware';
import TodoController from '../controllers/todo.controller';

const router = Router();
const todoController = container.get(TodoController);

router.use(tokenMiddleware);

router.get('/', asyncHandler(todoController.fetch.bind(todoController)));
router.get('/:todoId', asyncHandler(todoController.fetchSpecificTodo.bind(todoController)));
router.post('/', asyncHandler(todoController.create.bind(todoController)));
router.put('/:todoId', asyncHandler(todoController.update.bind(todoController)));
router.delete('/', asyncHandler(todoController.removeMultiple.bind(todoController)));
router.delete('/:todoId', asyncHandler(todoController.remove.bind(todoController)));

export default router;