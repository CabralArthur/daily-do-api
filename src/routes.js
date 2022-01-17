import { Router } from 'express';
import UserRoutes from './routes/user';
import TaskRoutes from './routes/task';
import ColorRoutes from './routes/color';
import AuthRoutes from './routes/auth';

class Routes {
	constructor() {
		this.routes = new Router();

		this.userRoutes = new UserRoutes();
		this.taskRoutes = new TaskRoutes();
		this.colorRoutes = new ColorRoutes();
		this.authenticateRoutes = new AuthRoutes();
	}

	setup() {
		this.routes.use('/task', this.taskRoutes.setup());
		this.routes.use('/user', this.userRoutes.setup());
		this.routes.use('/color', this.colorRoutes.setup());
		this.routes.use('/authenticate', this.authenticateRoutes.setup());

		return this.routes;
	}
}

export default Routes;
