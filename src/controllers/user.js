import BaseController from './base';
import HttpStatus from 'http-status-codes';
import UserService from '../services/user';

class UserController extends BaseController {
	constructor() {
		super();

		this.service = new UserService();
		this.list = this.list.bind(this);
		this.find = this.find.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
		this.create = this.create.bind(this);
	}

	async list(req, res) {
		try {
			const users = await this.service.list();

			this.successHandler(users, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async find(req, res) {
		try {
			const filter = {
				id: req.params.id
			};

			const user = await this.service.find(filter);

			this.successHandler(user, res);
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

			const updatedUser = await this.service.update(options);

			this.successHandler(updatedUser, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async delete(req, res) {
		try {
			const filter = {
				id: req.params.id
			};

			const deletedUser = await this.service.delete(filter);

			this.successHandler(deletedUser, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async create(req, res) {
		try {
			const data = {
				name: req.data.name,
				username: req.data.username,
				password: req.data.password,
				is_admin: false
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

