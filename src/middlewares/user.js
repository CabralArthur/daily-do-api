import HttpStatus from 'http-status-codes';
import ServerUtils from '../utils/server-utils';

import User from '../models/user';

export default async (req, res, next) => {
	const userId = ~~(
		req.params.id ||
		req.query.id ||
		req.body.id
	);

	const token = req.headers.authorization;
	const data = ServerUtils.decodeToken(token);

	if (data.id !== userId) {
		res.status(HttpStatus.FORBIDDEN).json({
			code: HttpStatus.FORBIDDEN,
			message: 'Você não tem permissão para acessar essa informação.'
		});

		return next('Você não tem permissão para acessar essa informação.');
	}

	const userExist = await User.count({ where: { id: userId } });

	if (!userExist) {
		res.status(HttpStatus.NOT_FOUND).json({
			code: HttpStatus.NOT_FOUND,
			message: 'Usuário não encontrado.'
		});

		return next('Usuário não encontrado.');
	}

	return next();
};
