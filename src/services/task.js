import Task from '../models/task';

class TaskService {
	constructor() {
		this.taskModel = Task.getInstance();
		this.taskReadModel = Task.getInstance('replica');
	}

	async find(filter) {
		return await this.taskReadModel.findAll({
			where: {
				id: filter.id
			}
		});
	}

	async delete(filter) {
		return await this.taskModel.destroy({
			where: {
				id: filter.id
			}
		});
	}

	async update({ data, filter }) {
		const taskInfo = {
			...data
		};

		const updatedTask = await this.taskModel.update(taskInfo, {
			where: { id: filter.id }
		});

		return updatedTask;
	}

	async create(task) {
		const createdTask = await this.taskModel.create(task);

		return createdTask;
	}

	async list() {
		return await this.taskReadModel.findAll();
	}
}

export default TaskService;
