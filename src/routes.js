
import { Router } from 'express';
import TaskRoutes from './routes/tasks';

class Routes {
	constructor() {
		this.routes = new Router();

		this.taskRoutes = new TaskRoutes();
	}

	setup() {
		this.routes.use('/tasks', this.taskRoutes.setup());

		return this.routes;
	}
}

export default Routes;
