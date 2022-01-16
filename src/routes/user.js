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
		this.router.post('/', SchemaValidator.validate(UserSchema.create), this.userController.create);

		return this.router;
	}
}

export default UserRoutes;
