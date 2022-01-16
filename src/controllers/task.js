import BaseController from './base';
import TaskService from '../services/task';

class TaskController extends BaseController {
	constructor() {
		super();

		this.service = new TaskService();
		this.list = this.list.bind(this);
		this.find = this.find.bind(this);
		this.update = this.update.bind(this);
		this.create = this.create.bind(this);
		this.delete = this.delete.bind(this);
	}

	async find(req,res) {
		try {
			const filter = {
				id: req.params.id
			};

			const task = await this.service.find(filter);

			this.successHandler(task, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			const options = {
				data: { ...req.data },
				filter: { ...req.params }
			};

			const updatedTask = await this.service.update(options);

			this.successHandler(updatedTask, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async delete(req, res) {
		try {
			const filter = {
				id: req.params.id
			};

			const deletedTask = await this.service.delete(filter);

			this.successHandler(deletedTask, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		try {
			const tasks = await this.service.list();

			this.successHandler(tasks, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
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

export default TaskController;

