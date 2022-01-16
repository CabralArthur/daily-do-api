import BaseController from './base';
import HttpStatus from 'http-status-codes';
import UserService from '../services/user';
class UserController extends BaseController {
	constructor() {
		super();

		this.service = new UserService();
		this.create = this.create.bind(this);
	}

	async create(req, res) {
		try {
			const data = {
				name: req.data.name,
				username: req.data.username,
				password: req.data.password,
				is_admin: req.data.is_admin
			};

			const user = await this.service.create(data);

			if (!user) {
				res.status(HttpStatus.CONFLICT).json({
					code: HttpStatus.CONFLICT,
					message: 'Já existe um usuário cadastrado com esse nickname.'
				});
			}

			res.status(HttpStatus.OK).json({ data: user });
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default UserController;

