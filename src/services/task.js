import Task from '../models/task';

class UserService {
	constructor() {
		this.taskModel = Task.getInstance();
		this.taskReadModel = Task.getInstance('replica');
	}

	async create(task) {
		const createdTask = await this.taskModel.create(task);

		return createdTask;
	}

}

export default UserService;
