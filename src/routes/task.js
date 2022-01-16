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
		this.router.get('/', this.taskController.list);
		this.router.get('/:id', SchemaValidator.validate(TaskSchema.find), this.taskController.find);
		this.router.post('/', SchemaValidator.validate(TaskSchema.create), this.taskController.create);
		this.router.put('/:id', SchemaValidator.validate(TaskSchema.update), this.taskController.update);
		this.router.delete('/:id', SchemaValidator.validate(TaskSchema.delete), this.taskController.delete);

		return this.router;
	}
}

export default TaskRoutes;
