import { Router } from 'express';

import AuthSchema from '../schemas/auth';
import SchemaValidator from '../utils/schema-validator';
import AuthController from '../controllers/auth';

class AuthRoutes {
	constructor() {
		this.router = new Router();

		this.authController = new AuthController();
	}

	setup() {
		this.router.post('/', SchemaValidator.validate(AuthSchema.authenticate), this.authController.authenticate);

		return this.router;
	}
}

export default AuthRoutes;
