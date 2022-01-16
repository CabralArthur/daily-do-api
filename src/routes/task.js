import { Router } from 'express';

import TaskSchema from '../schemas/task';
import TaskController from '../controllers/task';
import SchemaValidator from '../utils/schema-validator';

class TaskRoutes {
	constructor() {
		this.router = new Router();

		this.taskController = new TaskController();
	}

	setup() {
		this.router.post('/', SchemaValidator.validate(TaskSchema.create), this.taskController.create);

		return this.router;
	}
}

export default TaskRoutes;
