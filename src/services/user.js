import bcrypt from 'bcrypt';
import User from '../models/user';

class UserService {
	constructor() {
		this.userModel = User.getInstance();
		this.userModel = User.getInstance('replica');
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


}

export default UserService;
