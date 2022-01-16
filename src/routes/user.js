import { Router } from 'express';

import UserSchema from '../schemas/user';
import userController from '../controllers/user';
import SchemaValidator from '../utils/schema-validator';
class UserRoutes {
	constructor() {
		this.router = new Router();

		this.userController = new userController();
	}

	setup() {
		this.router.get('/', this.userController.list);
		this.router.get('/:id', SchemaValidator.validate(UserSchema.find), this.userController.find);
		this.router.post('/', SchemaValidator.validate(UserSchema.create), this.userController.create);
		this.router.put('/:id', SchemaValidator.validate(UserSchema.update), this.userController.update);
		this.router.delete('/:id', SchemaValidator.validate(UserSchema.delete), this.userController.delete);

		return this.router;
	}
}

export default UserRoutes;
