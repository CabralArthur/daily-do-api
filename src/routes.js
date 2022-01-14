import { Router } from 'express';
import UserRoutes from './routes/user';

class Routes {
	constructor() {
		this.routes = new Router();

		this.userRoutes = new UserRoutes();
	}

	setup() {
		this.routes.use('/user', this.userRoutes.setup());

		return this.routes;
	}
}

export default Routes;
