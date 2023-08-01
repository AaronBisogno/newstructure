import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';

const userController = new UserController();

export const usersRouter = Router();

usersRouter.get('/', userController.getAll);

usersRouter.post('/', userController.create);

usersRouter.put('/:id', userController.updateUserById);

usersRouter.delete('/:id', userController.deleteUserById);
