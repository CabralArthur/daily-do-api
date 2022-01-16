import { Router } from 'express';
import UserRoutes from './routes/user';
import TaskRoutes from './routes/task';
import ColorRoutes from './routes/color';

class Routes {
	constructor() {
		this.routes = new Router();

		this.userRoutes = new UserRoutes();
		this.taskRoutes = new TaskRoutes();
		this.colorRoutes = new ColorRoutes();
	}

	setup() {
		this.routes.use('/user', this.userRoutes.setup());
		this.routes.use('/task', this.taskRoutes.setup());
		this.routes.use('/color', this.colorRoutes.setup());

		return this.routes;
	}
}

export default Routes;
