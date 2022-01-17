import BaseController from './base';
import HttpStatus from 'http-status-codes';
import AuthService from '../services/auth';

class AuthController extends BaseController {
	constructor() {
		super();

		this.service = new AuthService();
		this.authenticate = this.authenticate.bind(this);
	}

	async authenticate(req, res) {
		try {
			const userInfo = {
				username: req.data.username,
				password: req.data.password
			};

			const { error, data } = await this.service.authenticate(userInfo);

			if (error) {
				res.status(HttpStatus.UNAUTHORIZED).json({
					code: error.code,
					message: error.message
				});
			}

			this.successHandler(data, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default AuthController;

