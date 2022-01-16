import { Router } from 'express';

import ColorSchema from '../schemas/color';
import ColorController from '../controllers/color';
import SchemaValidator from '../utils/schema-validator';

class TaskRoutes {
	constructor() {
		this.router = new Router();

		this.colorController = new ColorController();
	}

	setup() {
		this.router.get('/', this.colorController.list);
		this.router.get('/:id', SchemaValidator.validate(ColorSchema.find), this.colorController.find);
		this.router.post('/', SchemaValidator.validate(ColorSchema.create), this.colorController.create);
		this.router.put('/:id', SchemaValidator.validate(ColorSchema.update), this.colorController.update);
		this.router.delete('/:id', SchemaValidator.validate(ColorSchema.delete), this.colorController.delete);

		return this.router;
	}
}

export default TaskRoutes;
