import HttpStatus from 'http-status-codes';
import ServerUtils from '../utils/server-utils';

import User from '../models/user';

export default async (req, res, next) => {
	const token = req.headers.authorization;
	const data = ServerUtils.decodeToken(token);

	const user = await User.findByPk(data.id);

	if (!user.is_admin) {
		res.status(HttpStatus.FORBIDDEN).json({
			code: HttpStatus.FORBIDDEN,
			message: 'Você não tem permissão para acessar essa informação.'
		});

		return next('Você não tem permissão para acessar essa informação.');
	}

	return next();
};
