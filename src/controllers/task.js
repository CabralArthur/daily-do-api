import BaseController from './base';
import TaskService from '../services/task';

class UserController extends BaseController {
	constructor() {
		super();

		this.service = new TaskService();
		this.create = this.create.bind(this);
	}

	async create(req, res) {
		try {
			const data = {
				name: req.data.name,
				user_id: req.data.user_id,
				status: req.data.status,
				label_color_id: req.data.label_color_id,
				short_description: req.data.short_description
			};

			const task = await this.service.create(data);

			this.successHandler(task, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default UserController;

