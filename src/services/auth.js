import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import User from '../models/user';
import HttpStatus from 'http-status-codes';
import ServerUtils from '../utils/server-utils';

class AuthService {
	constructor() {
		this.userModel = User.getInstance();
		this.userReadModel = User.getInstance('replica');
	}

	async authenticate(credentials) {
		const user = await this.userModel.findOne({
			where: {
				username: credentials.username
			},
			raw: true,
			attributes: ['id', 'name', 'username', 'is_admin', 'password']
		});

		if (!user) {
			return {
				error: {
					code: HttpStatus.UNAUTHORIZED,
					message: 'Email ou senha inválidos, tente novamente.'
				}
			};
		}

		const isValidPassword = bcrypt.compareSync(credentials.password, user.password);

		if (!isValidPassword) {
			return {
				error: {
					code: HttpStatus.UNAUTHORIZED,
					message: 'Email ou senha inválidos, tente novamente.'
				}
			};
		}

		const userInfo = omit(user, 'password');

		userInfo.token = ServerUtils.generateToken(userInfo);

		return { data: userInfo };
	}

}

export default AuthService;
