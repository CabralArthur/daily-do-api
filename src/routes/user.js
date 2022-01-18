import { Router } from 'express';

import UserSchema from '../schemas/user';
import AuthMiddleware from '../middlewares/auth';
import UserController from '../controllers/user';
import UserMiddleware from '../middlewares/user';
import AdminMiddleware from '../middlewares/admin';
import SchemaValidator from '../utils/schema-validator';

class UserRoutes {
	constructor() {
		this.router = new Router();

		this.userController = new UserController();
	}

	setup() {
		this.router.get('/', [AuthMiddleware, AdminMiddleware], this.userController.list);
		this.router.post('/', SchemaValidator.validate(UserSchema.create), this.userController.create);
		this.router.get('/:id', [AuthMiddleware, UserMiddleware], SchemaValidator.validate(UserSchema.find), this.userController.find);
		this.router.put('/:id', [AuthMiddleware, UserMiddleware], SchemaValidator.validate(UserSchema.update), this.userController.update);
		this.router.delete('/:id', [AuthMiddleware, AdminMiddleware], SchemaValidator.validate(UserSchema.delete), this.userController.delete);

		return this.router;
	}
}

export default UserRoutes;
