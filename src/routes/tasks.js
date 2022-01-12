import { Router } from 'express';
import TaskController from '../controllers/task';

class TaskRoutes {
	constructor() {
		this.router = new Router();

		this.taskController = new TaskController();
	}

	setup() {
		this.router.get('/', this.taskController.list);

		return this.router;
	}
}

export default TaskRoutes;
