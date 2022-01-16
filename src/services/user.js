import bcrypt from 'bcrypt';
import User from '../models/user';

class UserService {
	constructor() {
		this.userModel = User.getInstance();
		this.userReadModel = User.getInstance('replica');
	}

	async create(user) {
		const userAlreadyExist = await this.userModel.count({
			where: { username: user.username }
		});

		if (userAlreadyExist) {
			return null;
		}

		user.password = await bcrypt.hash(user.password, 8);

		const createdUser = await this.userModel.create(user);

		return createdUser;
	}

	async update({ data, filter }) {
		const userInfo = {
			...data
		};

		if (data.new_password) {
			userInfo.password = await bcrypt.hash(data.new_password, 8);
		}

		const updatedUser = await User.update(userInfo, {
			where: { id: filter.id }
		});

		return updatedUser;
	}

	async delete(filter) {
		const deletedUser = await this.userModel.destroy({
			where: { id: filter.id }
		});

		return deletedUser;
	}

	find(user) {
		return this.userReadModel.findAll({
			where: {
				id: user.id
			}
		});
	}

	list() {
		return this.userReadModel.findAll();
	}

}

export default UserService;
