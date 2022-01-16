import { Router } from 'express';
import UserRoutes from './routes/user';
import TaskRoutes from './routes/task';
class Routes {
	constructor() {
		this.routes = new Router();

		this.userRoutes = new UserRoutes();
		this.taskRoutes = new TaskRoutes();
	}

	setup() {
		this.routes.use('/user', this.userRoutes.setup());
		this.routes.use('/task', this.taskRoutes.setup());
		return this.routes;
	}
}

export default Routes;
