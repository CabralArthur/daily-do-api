import { Router } from 'express';

import userController from '../controllers/user';

class UserRoutes {
	constructor() {
		this.router = new Router();

		this.userController = new userController();
	}

	setup() {
		this.router.get('/', this.userController.create);

		return this.router;
	}
}

export default UserRoutes;
